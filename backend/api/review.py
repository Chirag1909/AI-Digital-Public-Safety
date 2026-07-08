from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from database.db import get_connection
from utils.logger import get_logger

router = APIRouter(prefix="", tags=["review"])
logger = get_logger(__name__)


class ReviewRequest(BaseModel):
    prediction_id: int = Field(..., ge=1)
    decision: str = Field(..., pattern="^(approved|rejected|escalated)$")
    notes: str = Field(default="", max_length=1000)


class ReviewResponse(BaseModel):
    prediction_id: int
    status: str
    decision: str
    notes: str


@router.post("/review", response_model=ReviewResponse)
def review(payload: ReviewRequest) -> ReviewResponse:
    try:
        with get_connection() as conn:
            prediction_row = conn.execute(
                "SELECT id FROM predictions WHERE id = ?",
                (payload.prediction_id,),
            ).fetchone()
            if prediction_row is None:
                raise HTTPException(status_code=404, detail="Prediction not found")

            conn.execute(
                "UPDATE review_queue SET status = ? WHERE prediction_id = ?",
                (payload.decision, payload.prediction_id),
            )
            if conn.total_changes == 0:
                conn.execute(
                    "INSERT INTO review_queue (prediction_id, reason, status, created_at) VALUES (?, ?, ?, datetime('now'))",
                    (payload.prediction_id, payload.notes or "manual_review", payload.decision),
                )

            conn.execute(
                "INSERT INTO history (prediction_id, action, details, created_at) VALUES (?, ?, ?, datetime('now'))",
                (payload.prediction_id, "reviewed", f"decision={payload.decision};notes={payload.notes}"),
            )

        return ReviewResponse(
            prediction_id=payload.prediction_id,
            status="reviewed",
            decision=payload.decision,
            notes=payload.notes,
        )
    except HTTPException:
        raise
    except Exception as exc:  # noqa: BLE001
        logger.exception("Review submission failed")
        raise HTTPException(status_code=500, detail="Failed to record manual review") from exc
