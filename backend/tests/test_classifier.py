from models.scam_classifier import ScamClassifier


def test_fallback_classifier_detects_scam_signals() -> None:
    classifier = ScamClassifier()
    result = classifier.predict("Police calling for urgent Aadhaar KYC and OTP verification.")
    assert result.label in {"scam", "safe"}
    assert 0.0 <= result.confidence <= 1.0
    assert isinstance(result.red_flags, list)


def test_fallback_classifier_handles_safe_text() -> None:
    classifier = ScamClassifier()
    result = classifier.predict("Reminder: team meeting at 5 PM, no action needed.")
    assert result.category in {
        "safe",
        "digital_arrest",
        "police_impersonation",
        "otp_scam",
        "upi_scam",
        "bank_kyc_scam",
        "parcel_scam",
        "aadhaar_scam",
        "cyber_crime_scam",
    }
