from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_health_returns_machine_readable_status() -> None:
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {
        "status": "ok",
        "service": "nexus-backend",
        "environment": "development",
    }


def test_openapi_schema_is_reachable() -> None:
    response = client.get("/openapi.json")

    schema = response.json()

    assert response.status_code == 200
    assert schema["info"]["title"] == "Nexus API"
    assert "/health" in schema["paths"]
