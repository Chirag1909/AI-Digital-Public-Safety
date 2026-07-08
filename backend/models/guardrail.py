from __future__ import annotations

from dataclasses import dataclass

from config import get_settings


@dataclass(slots=True)
class GuardrailOutcome:
    risk: str
    needs_review: bool
    recommendation: str


class ConfidenceGuardrail:
    def __init__(self) -> None:
        settings = get_settings()
        self.high_risk_threshold = settings.high_risk_threshold
        self.review_threshold = settings.review_threshold

    def evaluate(self, confidence: float) -> GuardrailOutcome:
        if confidence > self.high_risk_threshold:
            return GuardrailOutcome(
                risk="high_risk",
                needs_review=False,
                recommendation="Potential scam detected. Do not transfer money or share OTP. Report immediately.",
            )
        if self.review_threshold <= confidence <= self.high_risk_threshold:
            return GuardrailOutcome(
                risk="needs_human_review",
                needs_review=True,
                recommendation="Suspicious content detected. Escalated for manual review.",
            )
        return GuardrailOutcome(
            risk="safe",
            needs_review=False,
            recommendation="No strong fraud indicators detected. Continue with normal caution.",
        )
