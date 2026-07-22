from __future__ import annotations

import json
from dataclasses import asdict, dataclass

from database.db import get_connection
from models.guardrail import ConfidenceGuardrail
from models.scam_classifier import ScamClassifier
from models.translator import TranslatorService
from services.language_detector import LanguageDetectorService
from services.preprocessing import TextPreprocessor
from utils.helpers import utc_now_iso


@dataclass(slots=True)
class PredictionResponse:
    risk: str
    confidence: float
    category: str
    red_flags: list[str]
    recommendation: str
    language: str
    needs_review: bool
    prediction_id: int | None = None


class PredictionService:
    def __init__(self) -> None:
        self.preprocessor = TextPreprocessor()
        self.language_detector = LanguageDetectorService()
        self.translator = TranslatorService()
        self.classifier = ScamClassifier()
        self.guardrail = ConfidenceGuardrail()

    def classify_text(self, input_text: str) -> PredictionResponse:
        normalized_text = self.preprocessor.normalize(input_text)
        language = self.language_detector.detect_language(normalized_text)
        translated_text = self.translator.to_model_language(normalized_text, language)

        model_result = self.classifier.predict(translated_text)
        guardrail_result = self.guardrail.evaluate(model_result.confidence)

        response = PredictionResponse(
            risk=guardrail_result.risk,
            confidence=round(model_result.confidence, 4),
            category=model_result.category,
            red_flags=model_result.red_flags,
            recommendation=guardrail_result.recommendation,
            language=language,
            needs_review=guardrail_result.needs_review,
        )
        prediction_id = self._store_prediction(input_text, normalized_text, response)
        response.prediction_id = prediction_id
        return response

    def _store_prediction(
        self,
        input_text: str,
        normalized_text: str,
        response: PredictionResponse,
    ) -> int:
        created_at = utc_now_iso()
        with get_connection() as conn:
            cursor = conn.execute(
                """
                INSERT INTO predictions (
                    input_text, normalized_text, detected_language, risk, confidence,
                    category, red_flags, recommendation, requires_review, created_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    input_text,
                    normalized_text,
                    response.language,
                    response.risk,
                    response.confidence,
                    response.category,
                    json.dumps(response.red_flags),
                    response.recommendation,
                    int(response.needs_review),
                    created_at,
                ),
            )
            prediction_id = cursor.lastrowid

            conn.execute(
                "INSERT INTO history (prediction_id, action, details, created_at) VALUES (?, ?, ?, ?)",
                (prediction_id, "classified", json.dumps(asdict(response)), created_at),
            )

            if response.needs_review:
                conn.execute(
                    """
                    INSERT INTO review_queue (prediction_id, reason, status, created_at)
                    VALUES (?, ?, 'pending', ?)
                    """,
                    (prediction_id, "confidence_between_0.70_and_0.90", created_at),
                )
            return prediction_id
