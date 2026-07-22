from __future__ import annotations

import sqlite3
from contextlib import contextmanager
from pathlib import Path
from typing import Iterator

from config import get_settings
from utils.logger import get_logger

logger = get_logger(__name__)


def _ensure_parent_dir(path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)


def init_db() -> None:
    settings = get_settings()
    _ensure_parent_dir(settings.database_path)
    schema_sql = settings.schema_path.read_text(encoding="utf-8")
    with sqlite3.connect(settings.database_path) as conn:
        conn.executescript(schema_sql)
        conn.commit()
    logger.info("Database initialized at %s", settings.database_path)


@contextmanager
def get_connection() -> Iterator[sqlite3.Connection]:
    settings = get_settings()
    conn = sqlite3.connect(settings.database_path)
    conn.row_factory = sqlite3.Row
    try:
        yield conn
        conn.commit()
    finally:
        conn.close()
