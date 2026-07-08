from __future__ import annotations

import argparse
from pathlib import Path

import pandas as pd
from sklearn.model_selection import train_test_split

REQUIRED_COLUMNS = {"text", "label", "category", "language", "red_flags"}


def normalize_text(text: str) -> str:
    return " ".join(str(text).strip().split())


def validate_dataset(df: pd.DataFrame) -> None:
    missing = REQUIRED_COLUMNS - set(df.columns)
    if missing:
        raise ValueError(f"Dataset missing required columns: {sorted(missing)}")
    if df["text"].isna().any():
        raise ValueError("Dataset contains null values in `text`.")
    if df["label"].isna().any():
        raise ValueError("Dataset contains null values in `label`.")


def preprocess(input_path: Path, output_dir: Path, test_size: float, random_state: int) -> None:
    output_dir.mkdir(parents=True, exist_ok=True)
    df = pd.read_csv(input_path)
    validate_dataset(df)
    df["text"] = df["text"].apply(normalize_text)
    df["label"] = df["label"].str.strip().str.lower().map({"safe": 0, "scam": 1})
    if df["label"].isna().any():
        raise ValueError("`label` must contain only 'safe' or 'scam'.")
    train_df, test_df = train_test_split(
        df,
        test_size=test_size,
        random_state=random_state,
        stratify=df["label"],
    )
    train_df.to_csv(output_dir / "train.csv", index=False)
    test_df.to_csv(output_dir / "test.csv", index=False)
    print(f"Saved processed train/test files to {output_dir}")


def main() -> None:
    parser = argparse.ArgumentParser(description="Preprocess scam dataset")
    parser.add_argument("--input", required=True, type=Path, help="Raw dataset CSV path")
    parser.add_argument(
        "--output-dir",
        default=Path(__file__).resolve().parent.parent / "datasets" / "processed",
        type=Path,
    )
    parser.add_argument("--test-size", default=0.2, type=float)
    parser.add_argument("--random-state", default=42, type=int)
    args = parser.parse_args()
    preprocess(args.input, args.output_dir, args.test_size, args.random_state)


if __name__ == "__main__":
    main()
