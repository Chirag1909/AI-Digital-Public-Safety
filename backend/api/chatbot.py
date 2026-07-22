from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from services.prediction_service import PredictionService
from utils.logger import get_logger

router = APIRouter(prefix="", tags=["chatbot"])
logger = get_logger(__name__)
prediction_service = PredictionService()


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1)


class ChatResponse(BaseModel):
    reply: str
    risk: str
    confidence: float
    category: str
    recommendation: str
    needs_review: bool


@router.post("/chat", response_model=ChatResponse)
def chat(payload: ChatRequest) -> ChatResponse:
    try:
        result = prediction_service.classify_text(payload.message)
        if result.risk == "high_risk":
            reply = (
                "I detected strong scam indicators in your message. "
                f"{result.recommendation}"
            )
        elif result.needs_review:
            reply = (
                "This message looks suspicious and should be reviewed by a human operator. "
                f"{result.recommendation}"
            )
        else:
            reply = (
                "The message does not show strong fraud indicators, but please remain cautious. "
                f"{result.recommendation}"
            )

        return ChatResponse(
            reply=reply,
            risk=result.risk,
            confidence=result.confidence,
            category=result.category,
            recommendation=result.recommendation,
            needs_review=result.needs_review,
        )
    except Exception as exc:  # noqa: BLE001
        logger.exception("Chat analysis failed")
        raise HTTPException(status_code=500, detail="Chat analysis failed") from exc
