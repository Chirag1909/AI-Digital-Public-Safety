# API Documentation

Base URL: `http://127.0.0.1:8000`

## GET `/`
Health check endpoint.

### Response
```json
{
  "message": "Backend Running"
}
```

## POST `/classify`
Analyze suspicious text for fraud signals.

### Request Body
```json
{
  "text": "Your Aadhaar is linked to illegal activity. Transfer money now."
}
```

### Response
```json
{
  "risk": "high_risk",
  "confidence": 0.94,
  "category": "digital_arrest",
  "red_flags": ["police_impersonation", "fear_language"],
  "recommendation": "Potential scam detected. Do not transfer money or share OTP. Report immediately.",
  "language": "en",
  "needs_review": false
}
```

## Guardrail Logic
- confidence `> 0.90` -> `high_risk`
- confidence `0.70 to 0.90` -> `needs_human_review` and inserted into `review_queue`
- confidence `< 0.70` -> `safe`

## POST `/ocr`
Upload an image, extract text through OCR, and classify the extracted content.

### Request
`multipart/form-data` with file field:
- `file`: image (`jpg`, `jpeg`, `png`, `webp`)

### Response
```json
{
  "extracted_text": "Your account is blocked. Share OTP now.",
  "risk": "high_risk",
  "confidence": 0.91,
  "category": "otp_scam",
  "red_flags": ["otp_request", "urgency"],
  "recommendation": "Potential scam detected. Do not transfer money or share OTP. Report immediately.",
  "language": "en",
  "needs_review": false
}
```

## Planned Endpoints (Next Phases)
- `POST /chat`
- `POST /review`
- `GET /history`
