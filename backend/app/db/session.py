from app.config.settings import get_settings


def get_database_url() -> str:
    return get_settings().database_url
