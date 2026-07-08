import json

from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel

from database.db import get_connection
from utils.logger import get_logger

router = APIRouter(prefix="", tags=["history"])
logger = get_logger(__name__)


class HistoryItem(BaseModel):
    prediction_id: int
    action: str
    risk: str
    confidence: float
    category: str
    red_flags: list[str]
    recommendation: str
    language: str
    created_at: str


class HistoryResponse(BaseModel):
    count: int
    items: list[HistoryItem]


@router.get("/history", response_model=HistoryResponse)
def history(limit: int = Query(default=10, ge=1, le=100)) -> HistoryResponse:
    try:
        with get_connection() as conn:
            rows = conn.execute(
                """
                SELECT p.id AS prediction_id, h.action, p.risk, p.confidence, p.category,
                       p.red_flags, p.recommendation, p.detected_language AS language, h.created_at
                FROM history h
                JOIN predictions p ON p.id = h.prediction_id
                ORDER BY h.created_at DESC, h.id DESC
                LIMIT ?
                """,
                (limit,),
            ).fetchall()

        items = []
        for row in rows:
            items.append(
                HistoryItem(
                    prediction_id=row["prediction_id"],
                    action=row["action"],
                    risk=row["risk"],
                    confidence=float(row["confidence"]),
                    category=row["category"],
                    red_flags=json.loads(row["red_flags"] or "[]"),
                    recommendation=row["recommendation"],
                    language=row["language"],
                    created_at=row["created_at"],
                )
            )
        return HistoryResponse(count=len(items), items=items)
    except Exception as exc:  # noqa: BLE001
        logger.exception("History retrieval failed")
        raise HTTPException(status_code=500, detail="Failed to retrieve prediction history") from exc
