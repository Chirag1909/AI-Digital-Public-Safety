from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
from typing import Iterable

import torch
from transformers import AutoModelForSequenceClassification, AutoTokenizer

from config import get_settings
from utils.constants import DEFAULT_SCAM_FLAGS
from utils.helpers import clamp
from utils.logger import get_logger

logger = get_logger(__name__)


@dataclass(slots=True)
class ClassifierResult:
    label: str
    confidence: float
    category: str
    red_flags: list[str]


class ScamClassifier:
    def __init__(self) -> None:
        self.settings = get_settings()
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        self.model: AutoModelForSequenceClassification | None = None
        self.tokenizer: AutoTokenizer | None = None
        self._load_checkpoint_if_available()

    def _load_checkpoint_if_available(self) -> None:
        artifact_dir: Path = self.settings.model_artifact_dir
        if not artifact_dir.exists():
            logger.info("No model checkpoint directory found. Using fallback classifier.")
            return
        try:
            self.tokenizer = AutoTokenizer.from_pretrained(str(artifact_dir))
            self.model = AutoModelForSequenceClassification.from_pretrained(str(artifact_dir))
            self.model.to(self.device)
            self.model.eval()
            logger.info("Loaded transformer checkpoint from %s", artifact_dir)
        except Exception as exc:  # noqa: BLE001
            logger.warning("Checkpoint load failed. Falling back to rules. Error: %s", exc)
            self.model = None
            self.tokenizer = None

    def predict(self, text: str) -> ClassifierResult:
        if self.model and self.tokenizer:
            return self._predict_transformer(text)
        return self._predict_fallback(text)

    def _predict_transformer(self, text: str) -> ClassifierResult:
        assert self.model is not None
        assert self.tokenizer is not None
        inputs = self.tokenizer(
            text,
            truncation=True,
            padding=True,
            max_length=256,
            return_tensors="pt",
        )
        inputs = {k: v.to(self.device) for k, v in inputs.items()}
        with torch.no_grad():
            logits = self.model(**inputs).logits
            probs = torch.softmax(logits, dim=-1).squeeze().cpu().tolist()
        safe_prob, scam_prob = probs[0], probs[1]
        confidence = float(max(safe_prob, scam_prob))
        label = "scam" if scam_prob >= safe_prob else "safe"
        category = "digital_arrest" if label == "scam" else "safe"
        red_flags = self._extract_red_flags(text)
        return ClassifierResult(label=label, confidence=confidence, category=category, red_flags=red_flags)

    def _predict_fallback(self, text: str) -> ClassifierResult:
        lowered = text.lower()
        score = 0.0
        red_flags = self._extract_red_flags(lowered)

        high_risk_terms = (
            "arrest",
            "police",
            "crime branch",
            "otp",
            "upi",
            "kyc",
            "aadhaar",
            "transfer money",
            "urgent",
            "account blocked",
        )
        score += 0.12 * self._count_matches(lowered, high_risk_terms)
        score += 0.08 * len(red_flags)
        confidence = clamp(score, 0.10, 0.99)

        if confidence >= 0.70:
            label = "scam"
            category = self._infer_category(lowered)
        else:
            label = "safe"
            category = "safe"

        return ClassifierResult(
            label=label,
            confidence=confidence,
            category=category,
            red_flags=red_flags,
        )

    @staticmethod
    def _count_matches(text: str, terms: Iterable[str]) -> int:
        return sum(1 for term in terms if term in text)

    def _infer_category(self, text: str) -> str:
        category_rules = {
            "digital_arrest": ("digital arrest", "arrest", "police"),
            "otp_scam": ("otp", "verification code"),
            "upi_scam": ("upi", "collect request", "scan qr"),
            "bank_kyc_scam": ("kyc", "bank account blocked"),
            "aadhaar_scam": ("aadhaar", "identity suspension"),
            "parcel_scam": ("parcel", "customs", "courier"),
            "cyber_crime_scam": ("cyber crime", "fir", "investigation"),
        }
        for category, keywords in category_rules.items():
            if any(keyword in text for keyword in keywords):
                return category
        return "police_impersonation"

    def _extract_red_flags(self, text: str) -> list[str]:
        flag_map = {
            "police_impersonation": ("police", "crime branch", "investigation officer"),
            "fear_language": ("arrest", "legal action", "frozen", "jail"),
            "money_transfer_request": ("transfer", "send money", "deposit"),
            "otp_request": ("otp", "verification code"),
            "urgency": ("urgent", "immediately", "within 10 minutes"),
            "aadhaar_threat": ("aadhaar", "identity blocked"),
            "kyc_pressure": ("kyc", "account blocked"),
        }
        detected = [flag for flag, terms in flag_map.items() if any(term in text for term in terms)]
        return detected or list(DEFAULT_SCAM_FLAGS[:1])
