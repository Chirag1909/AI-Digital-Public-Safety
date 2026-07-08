from __future__ import annotations

import sys
from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI

BACKEND_ROOT = Path(__file__).resolve().parent
if str(BACKEND_ROOT) not in sys.path:
    sys.path.insert(0, str(BACKEND_ROOT))

from api.chatbot import router as chatbot_router
from api.classify import router as classify_router
from api.history import router as history_router
from api.ocr import router as ocr_router
from api.review import router as review_router
from config import get_settings
from database.db import init_db
from utils.logger import configure_logging


def create_app() -> FastAPI:
    settings = get_settings()
    configure_logging()

    @asynccontextmanager
    async def lifespan(_: FastAPI):
        init_db()
        yield

    app = FastAPI(
        title=settings.app_name,
        version=settings.app_version,
        description="AI-powered backend for digital public safety fraud analysis.",
        debug=settings.debug,
        docs_url="/docs",
        redoc_url="/redoc",
        openapi_url="/openapi.json",
        lifespan=lifespan,
    )

    @app.get("/", tags=["health"], summary="Service health check")
    def health() -> dict[str, str]:
        return {"message": "Backend Running"}

    app.include_router(classify_router)
    app.include_router(ocr_router)
    app.include_router(chatbot_router)
    app.include_router(review_router)
    app.include_router(history_router)
    return app


app = create_app()
