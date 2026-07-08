from __future__ import annotations

import time
from dataclasses import asdict

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field, field_validator

from services.prediction_service import PredictionService
from utils.logger import get_logger

router = APIRouter(prefix="", tags=["classification"])
logger = get_logger(__name__)
prediction_service = PredictionService()


class ClassifyRequest(BaseModel):
    text: str = Field(..., min_length=1, description="Suspicious text to analyze")

    @field_validator("text")
    @classmethod
    def validate_text(cls, value: str) -> str:
        if not value.strip():
            raise ValueError("Text cannot be empty or whitespace.")
        return value


class ClassifyResponse(BaseModel):
    prediction_id: int | None = None
    risk: str
    confidence: float
    category: str
    red_flags: list[str]
    recommendation: str
    language: str
    needs_review: bool


@router.post("/classify", response_model=ClassifyResponse)
def classify(payload: ClassifyRequest) -> ClassifyResponse:
    started = time.perf_counter()
    try:
        result = prediction_service.classify_text(payload.text)
        return ClassifyResponse(**asdict(result))
    except Exception as exc:  # noqa: BLE001
        logger.exception("Classification failed")
        raise HTTPException(status_code=500, detail="Internal classification failure") from exc
    finally:
        duration_ms = (time.perf_counter() - started) * 1000
        logger.info("classify_request_completed duration_ms=%.2f", duration_ms)
