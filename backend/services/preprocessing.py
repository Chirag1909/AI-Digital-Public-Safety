from __future__ import annotations

import re
import unicodedata


class TextPreprocessor:
    def normalize(self, text: str) -> str:
        normalized = unicodedata.normalize("NFKC", text).strip()
        normalized = re.sub(r"\s+", " ", normalized)
        return normalized
