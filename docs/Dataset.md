# Dataset Specification

The training pipeline expects a tabular dataset (CSV) with the following columns:

- `text`: raw message/call transcript/suspicious content
- `label`: `safe` or `scam`
- `category`: scam category label
- `language`: language tag (e.g., `en`, `hi`)
- `red_flags`: comma-separated or serialized fraud indicators

## Example Row
```csv
text,label,category,language,red_flags
"Your Aadhaar has been linked to illegal activity.",scam,aadhaar_scam,english,"fear_language,money_transfer_request,police_impersonation"
```

## Supported Categories
- `digital_arrest`
- `police_impersonation`
- `otp_scam`
- `upi_scam`
- `bank_kyc_scam`
- `parcel_scam`
- `aadhaar_scam`
- `cyber_crime_scam`
- `safe`

## Data Quality Rules
- `text` cannot be null or empty.
- `label` must be either `safe` or `scam`.
- Ensure category naming is consistent.
- Avoid duplicate entries where possible.
- Keep multilingual examples balanced across splits.
