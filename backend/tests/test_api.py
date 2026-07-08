import sqlite3

from fastapi.testclient import TestClient

from api import ocr as ocr_api
from app import app
from config import get_settings
from database.db import init_db

client = TestClient(app)


def _reset_db() -> None:
    settings = get_settings()
    init_db()
    with sqlite3.connect(settings.database_path) as conn:
        conn.execute("DELETE FROM review_queue")
        conn.execute("DELETE FROM history")
        conn.execute("DELETE FROM logs")
        conn.execute("DELETE FROM predictions")
        conn.commit()


def test_health_endpoint() -> None:
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Backend Running"}


def test_classify_endpoint_success() -> None:
    _reset_db()
    response = client.post("/classify", json={"text": "Your account is blocked. Share OTP immediately."})
    assert response.status_code == 200
    payload = response.json()
    assert "risk" in payload
    assert "confidence" in payload
    assert "category" in payload
    assert "red_flags" in payload
    assert "recommendation" in payload


def test_classify_endpoint_validation() -> None:
    response = client.post("/classify", json={"text": "   "})
    assert response.status_code == 422


def test_review_queue_insertion_for_mid_confidence() -> None:
    _reset_db()
    response = client.post("/classify", json={"text": "Please complete KYC urgently to avoid account freeze."})
    assert response.status_code == 200
    needs_review = response.json()["needs_review"]

    settings = get_settings()
    with sqlite3.connect(settings.database_path) as conn:
        count = conn.execute("SELECT COUNT(*) FROM review_queue").fetchone()[0]
    if needs_review:
        assert count == 1
    else:
        assert count == 0


def test_ocr_endpoint_rejects_invalid_content_type() -> None:
    response = client.post(
        "/ocr",
        files={"file": ("note.txt", b"not an image", "text/plain")},
    )
    assert response.status_code == 400


def test_ocr_endpoint_success(monkeypatch) -> None:
    _reset_db()

    def fake_extract_text(_path):
        return "Police said transfer money urgently and share OTP."

    monkeypatch.setattr(ocr_api.ocr_service, "extract_text", fake_extract_text)
    response = client.post(
        "/ocr",
        files={"file": ("sample.png", b"\x89PNG\r\n\x1a\nfake", "image/png")},
    )
    assert response.status_code == 200
    payload = response.json()
    assert payload["extracted_text"]
    assert "risk" in payload


def test_history_endpoint_returns_recent_predictions() -> None:
    _reset_db()
    client.post("/classify", json={"text": "Your account is blocked. Share OTP immediately."})

    response = client.get("/history")
    assert response.status_code == 200
    payload = response.json()
    assert payload["count"] >= 1
    assert len(payload["items"]) >= 1


def test_review_endpoint_updates_queue() -> None:
    _reset_db()
    classify_response = client.post(
        "/classify",
        json={"text": "Please complete KYC urgently to avoid account freeze."},
    )
    prediction_id = classify_response.json().get("prediction_id", 1)

    response = client.post(
        "/review",
        json={"prediction_id": prediction_id, "decision": "approved", "notes": "Reviewed by operator."},
    )
    assert response.status_code == 200
    assert response.json()["status"] == "reviewed"


def test_chat_endpoint_returns_human_friendly_reply() -> None:
    response = client.post(
        "/chat",
        json={"message": "Is this message safe? Your account is blocked. Share OTP immediately."},
    )
    assert response.status_code == 200
    payload = response.json()
    assert "reply" in payload
    assert "risk" in payload
