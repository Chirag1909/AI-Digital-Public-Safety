from __future__ import annotations

import argparse
from pathlib import Path

import matplotlib.pyplot as plt
import pandas as pd
import seaborn as sns
import torch
from sklearn.metrics import ConfusionMatrixDisplay, accuracy_score, classification_report, confusion_matrix
from transformers import AutoModelForSequenceClassification, AutoTokenizer


def evaluate(model_dir: Path, test_csv: Path, output_dir: Path) -> None:
    output_dir.mkdir(parents=True, exist_ok=True)
    tokenizer = AutoTokenizer.from_pretrained(str(model_dir))
    model = AutoModelForSequenceClassification.from_pretrained(str(model_dir))
    model.eval()

    df = pd.read_csv(test_csv)
    labels = df["label"].astype(int).tolist()
    predictions: list[int] = []

    for text in df["text"].tolist():
        inputs = tokenizer(text, return_tensors="pt", truncation=True, max_length=256)
        with torch.no_grad():
            logits = model(**inputs).logits
        predictions.append(int(torch.argmax(logits, dim=1).item()))

    acc = accuracy_score(labels, predictions)
    report = classification_report(labels, predictions, digits=4)
    matrix = confusion_matrix(labels, predictions)

    with (output_dir / "evaluation.txt").open("w", encoding="utf-8") as file:
        file.write(f"accuracy: {acc:.4f}\n\n")
        file.write(report)

    disp = ConfusionMatrixDisplay(confusion_matrix=matrix, display_labels=["safe", "scam"])
    disp.plot(cmap="Blues")
    plt.title("Confusion Matrix")
    plt.tight_layout()
    plt.savefig(output_dir / "confusion_matrix.png", dpi=200)
    plt.close()

    sns.set_theme()
    print(f"Evaluation artifacts saved to {output_dir}")


def main() -> None:
    parser = argparse.ArgumentParser(description="Evaluate scam classifier model")
    default_processed = Path(__file__).resolve().parent.parent / "datasets" / "processed"
    parser.add_argument(
        "--model-dir",
        default=Path(__file__).resolve().parent.parent / "checkpoints" / "xlm_roberta_scam",
        type=Path,
    )
    parser.add_argument("--test-csv", default=default_processed / "test.csv", type=Path)
    parser.add_argument(
        "--output-dir",
        default=Path(__file__).resolve().parent.parent / "outputs" / "evaluation",
        type=Path,
    )
    args = parser.parse_args()
    evaluate(args.model_dir, args.test_csv, args.output_dir)


if __name__ == "__main__":
    main()
