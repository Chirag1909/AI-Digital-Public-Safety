SCAM_LABEL = "scam"
SAFE_LABEL = "safe"

SUPPORTED_LANGUAGES = {
    "en": "English",
    "hi": "Hindi",
    "ta": "Tamil",
    "te": "Telugu",
    "gu": "Gujarati",
}

SUPPORTED_CATEGORIES = {
    "digital_arrest",
    "police_impersonation",
    "otp_scam",
    "upi_scam",
    "bank_kyc_scam",
    "parcel_scam",
    "aadhaar_scam",
    "cyber_crime_scam",
    "safe",
}

DEFAULT_SCAM_FLAGS = (
    "police_impersonation",
    "fear_language",
    "money_transfer_request",
    "otp_request",
    "urgency",
    "aadhaar_threat",
    "kyc_pressure",
)
