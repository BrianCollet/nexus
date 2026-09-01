from functools import lru_cache
from pathlib import Path

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict

ROOT_DIR = Path(__file__).resolve().parents[3]


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=ROOT_DIR / ".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    environment: str = Field(default="development", alias="NEXUS_ENV")
    backend_host: str = Field(default="127.0.0.1", alias="NEXUS_BACKEND_HOST")
    backend_port: int = Field(default=8000, alias="NEXUS_BACKEND_PORT")
    cors_origins_raw: str = Field(
        default="http://127.0.0.1:5173,http://localhost:5173",
        alias="NEXUS_CORS_ORIGINS",
    )
    database_url: str = Field(default="", alias="NEXUS_DATABASE_URL")

    @property
    def cors_origins(self) -> list[str]:
        return [
            origin.strip()
            for origin in self.cors_origins_raw.split(",")
            if origin.strip()
        ]


@lru_cache
def get_settings() -> Settings:
    return Settings()
