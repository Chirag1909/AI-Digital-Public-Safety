from __future__ import annotations

import argparse
from pathlib import Path

import numpy as np
from datasets import Dataset
from sklearn.metrics import accuracy_score, f1_score, precision_score, recall_score
from transformers import (
    AutoModelForSequenceClassification,
    AutoTokenizer,
    DataCollatorWithPadding,
    Trainer,
    TrainingArguments,
)

MODEL_NAME = "xlm-roberta-base"


def compute_metrics(eval_pred: tuple[np.ndarray, np.ndarray]) -> dict[str, float]:
    logits, labels = eval_pred
    preds = np.argmax(logits, axis=1)
    return {
        "accuracy": accuracy_score(labels, preds),
        "precision": precision_score(labels, preds, zero_division=0),
        "recall": recall_score(labels, preds, zero_division=0),
        "f1": f1_score(labels, preds, zero_division=0),
    }


def _prepare_dataset(csv_path: Path) -> Dataset:
    import pandas as pd

    df = pd.read_csv(csv_path)
    return Dataset.from_pandas(df[["text", "label"]], preserve_index=False)


def train(train_csv: Path, test_csv: Path, output_dir: Path, epochs: int, batch_size: int) -> None:
    output_dir.mkdir(parents=True, exist_ok=True)
    tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
    model = AutoModelForSequenceClassification.from_pretrained(MODEL_NAME, num_labels=2)

    train_ds = _prepare_dataset(train_csv)
    test_ds = _prepare_dataset(test_csv)

    def tokenize(batch: dict[str, list[str]]) -> dict[str, list[list[int]]]:
        return tokenizer(batch["text"], truncation=True, max_length=256)

    train_ds = train_ds.map(tokenize, batched=True)
    test_ds = test_ds.map(tokenize, batched=True)
    train_ds = train_ds.rename_column("label", "labels")
    test_ds = test_ds.rename_column("label", "labels")
    train_ds.set_format(type="torch", columns=["input_ids", "attention_mask", "labels"])
    test_ds.set_format(type="torch", columns=["input_ids", "attention_mask", "labels"])

    training_args = TrainingArguments(
        output_dir=str(output_dir),
        learning_rate=2e-5,
        per_device_train_batch_size=batch_size,
        per_device_eval_batch_size=batch_size,
        num_train_epochs=epochs,
        weight_decay=0.01,
        evaluation_strategy="epoch",
        save_strategy="epoch",
        load_best_model_at_end=True,
        metric_for_best_model="f1",
        logging_dir=str(output_dir / "logs"),
        report_to="none",
    )

    trainer = Trainer(
        model=model,
        args=training_args,
        train_dataset=train_ds,
        eval_dataset=test_ds,
        tokenizer=tokenizer,
        data_collator=DataCollatorWithPadding(tokenizer=tokenizer),
        compute_metrics=compute_metrics,
    )
    trainer.train()
    metrics = trainer.evaluate()
    trainer.save_model(str(output_dir))
    tokenizer.save_pretrained(str(output_dir))
    with (output_dir / "metrics.txt").open("w", encoding="utf-8") as file:
        for key, value in metrics.items():
            file.write(f"{key}: {value}\n")
    print(f"Training complete. Artifacts saved to {output_dir}")


def main() -> None:
    parser = argparse.ArgumentParser(description="Fine-tune xlm-roberta-base for scam classification")
    default_processed = Path(__file__).resolve().parent.parent / "datasets" / "processed"
    parser.add_argument("--train-csv", default=default_processed / "train.csv", type=Path)
    parser.add_argument("--test-csv", default=default_processed / "test.csv", type=Path)
    parser.add_argument(
        "--output-dir",
        default=Path(__file__).resolve().parent.parent / "checkpoints" / "xlm_roberta_scam",
        type=Path,
    )
    parser.add_argument("--epochs", default=3, type=int)
    parser.add_argument("--batch-size", default=8, type=int)
    args = parser.parse_args()
    train(args.train_csv, args.test_csv, args.output_dir, args.epochs, args.batch_size)


if __name__ == "__main__":
    main()
