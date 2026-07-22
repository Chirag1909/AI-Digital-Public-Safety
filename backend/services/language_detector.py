from __future__ import annotations

from langdetect import DetectorFactory, LangDetectException, detect

from config import get_settings

DetectorFactory.seed = 0


class LanguageDetectorService:
    def __init__(self) -> None:
        self._settings = get_settings()

    def detect_language(self, text: str) -> str:
        if len(text) < self._settings.min_text_length_for_lang_detect:
            return "unknown"
        try:
            return detect(text)
        except LangDetectException:
            return "unknown"
