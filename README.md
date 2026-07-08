# AI Digital Public Safety Platform

Production-oriented backend and ML foundation for proactive cyber-fraud detection.

## Phase 1 Deliverables
- FastAPI backend with health and classification APIs
- OCR API with image upload and classify flow
- SQLite persistence with predictions, review queue, logs, and history tables
- Rule-backed classifier interface with transformer checkpoint compatibility
- ML preprocessing, training, evaluation, and prediction scripts for `xlm-roberta-base`
- Unit tests  and project documentation

## Project Structure
- `backend/`: API, services, models, database, tests
- `ml/`: datasets, training scripts, checkpoints, outputs
- `docs/`: architecture, API, and dataset documentation

## Setup
1. Create and activate Python 3.11+ virtual environment.
2. Install dependencies:
   ```bash
   pip install -r backend/requirements.txt
   ```
3. Run API:
   ```bash
   uvicorn backend.app:app --reload --app-dir backend
   ```
4. Open Swagger UI at [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs).

## Running Tests
```bash
pytest backend/tests -q
```

## ML Pipeline Commands
Preprocess:
```bash
python ml/training/preprocess.py --input ml/datasets/raw/your_dataset.csv
```

Train:
```bash
python ml/training/train_classifier.py
```

Evaluate:
```bash
python ml/training/evaluate.py
```

Predict:
```bash
python ml/training/predict.py --text "Your Aadhaar is blocked. Send OTP now."
```

## Notes
- If a trained checkpoint exists under `ml/checkpoints`, backend inference uses it.
- Without a checkpoint, the API falls back to deterministic red-flag inference.
- Mid-confidence predictions (0.70-0.90) are routed to `review_queue`.
