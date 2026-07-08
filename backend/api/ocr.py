from __future__ import annotations

from dataclasses import asdict
from pathlib import Path
from tempfile import NamedTemporaryFile

from fastapi import APIRouter, File, HTTPException, UploadFile
from pydantic import BaseModel

from services.ocr_service import OCRService
from services.prediction_service import PredictionService
from utils.logger import get_logger

router = APIRouter(prefix="", tags=["ocr"])
logger = get_logger(__name__)
ocr_service = OCRService(languages=["en", "hi", "ta", "te", "gu"])
prediction_service = PredictionService()

ALLOWED_CONTENT_TYPES = {
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
}


class OCRResponse(BaseModel):
    extracted_text: str
    risk: str
    confidence: float
    category: str
    red_flags: list[str]
    recommendation: str
    language: str
    needs_review: bool


@router.post("/ocr", response_model=OCRResponse)
async def ocr(file: UploadFile = File(...)) -> OCRResponse:
    if file.content_type not in ALLOWED_CONTENT_TYPES:
        raise HTTPException(status_code=400, detail="Unsupported file type. Use jpg, jpeg, png, or webp.")

    suffix = Path(file.filename or "upload.png").suffix or ".png"
    temp_path: Path | None = None
    try:
        with NamedTemporaryFile(delete=False, suffix=suffix) as temp_file:
            temp_file.write(await file.read())
            temp_path = Path(temp_file.name)

        extracted_text = ocr_service.extract_text(temp_path)
        classification = prediction_service.classify_text(extracted_text)
        payload = asdict(classification)
        payload["extracted_text"] = extracted_text
        return OCRResponse(**payload)
    except ValueError as exc:
        raise HTTPException(status_code=422, detail=str(exc)) from exc
    except Exception as exc:  # noqa: BLE001
        logger.exception("OCR pipeline failed")
        raise HTTPException(status_code=500, detail="OCR processing failed") from exc
    finally:
        await file.close()
        if temp_path and temp_path.exists():
            temp_path.unlink(missing_ok=True)
