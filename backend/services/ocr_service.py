from __future__ import annotations

from pathlib import Path

import easyocr


class OCRService:
    def __init__(self, languages: list[str] | None = None) -> None:
        self.languages = languages or ["en"]
        self.reader: easyocr.Reader | None = None

    def _get_reader(self) -> easyocr.Reader:
        if self.reader is None:
            self.reader = easyocr.Reader(self.languages, gpu=False)
        return self.reader

    def extract_text(self, image_path: Path) -> str:
        reader = self._get_reader()
        results = reader.readtext(str(image_path), detail=0)
        text = " ".join(results).strip()
        if not text:
            raise ValueError("OCR could not extract text from the provided image.")
        return text
