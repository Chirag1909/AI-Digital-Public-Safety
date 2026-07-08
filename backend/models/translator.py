from __future__ import annotations


class TranslatorService:
    """
    Translation hook for future multilingual enhancement.
    For phase one, text is returned unchanged.
    """

    def to_model_language(self, text: str, source_language: str) -> str:
        return text
