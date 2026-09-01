from fastapi import APIRouter

from app.services.health import get_health_status

router = APIRouter(tags=["system"])


@router.get("/health")
def read_health() -> dict[str, str]:
    return get_health_status()
