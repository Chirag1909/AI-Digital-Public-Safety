from functools import lru_cache
from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "CyberRakshak AI"
    app_version: str = "0.1.0"
    environment: str = "development"
    debug: bool = True
    log_level: str = "INFO"
    cors_enabled: bool = True
    allowed_origins: list[str] = ["*"]

    project_root: Path = Path(__file__).resolve().parent.parent
    backend_root: Path = Path(__file__).resolve().parent
    database_path: Path = backend_root / "database" / "public_safety.db"
    schema_path: Path = backend_root / "database" / "schema.sql"

    model_artifact_dir: Path = project_root / "ml" / "checkpoints"
    outputs_dir: Path = project_root / "ml" / "outputs"

    high_risk_threshold: float = 0.90
    review_threshold: float = 0.70
    min_text_length_for_lang_detect: int = 15
    max_text_length: int = 500

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    def ensure_directories(self) -> None:
        self.model_artifact_dir.mkdir(parents=True, exist_ok=True)
        self.outputs_dir.mkdir(parents=True, exist_ok=True)


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    settings = Settings()
    settings.ensure_directories()
    return settings
