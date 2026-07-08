from pathlib import Path

from services.ocr_service import OCRService


class DummyReader:
    def readtext(self, _: str, detail: int = 0) -> list[str]:
        return ["sample", "ocr", "text"]


def test_ocr_service_extract_text() -> None:
    service = OCRService.__new__(OCRService)
    service.languages = ["en"]
    service.reader = DummyReader()
    output = service.extract_text(Path("dummy.png"))
    assert output == "sample ocr text"
