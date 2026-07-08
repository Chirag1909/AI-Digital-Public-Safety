from __future__ import annotations

import argparse
from pathlib import Path

import torch
from transformers import AutoModelForSequenceClassification, AutoTokenizer


def predict(text: str, model_dir: Path) -> tuple[str, float]:
    tokenizer = AutoTokenizer.from_pretrained(str(model_dir))
    model = AutoModelForSequenceClassification.from_pretrained(str(model_dir))
    model.eval()

    inputs = tokenizer(text, truncation=True, max_length=256, return_tensors="pt")
    with torch.no_grad():
        logits = model(**inputs).logits
        probs = torch.softmax(logits, dim=-1).squeeze().tolist()
    safe_prob, scam_prob = probs[0], probs[1]
    if scam_prob >= safe_prob:
        return "scam", float(scam_prob)
    return "safe", float(safe_prob)


def main() -> None:
    parser = argparse.ArgumentParser(description="Run inference with trained scam classifier")
    parser.add_argument("--text", required=True, type=str)
    parser.add_argument(
        "--model-dir",
        default=Path(__file__).resolve().parent.parent / "checkpoints" / "xlm_roberta_scam",
        type=Path,
    )
    args = parser.parse_args()
    label, confidence = predict(args.text, args.model_dir)
    print({"label": label, "confidence": round(confidence, 4)})


if __name__ == "__main__":
    main()
