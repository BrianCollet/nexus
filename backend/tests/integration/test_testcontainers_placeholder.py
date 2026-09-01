import shutil

import pytest


def test_testcontainers_requires_docker_available() -> None:
    if shutil.which("docker") is None:
        pytest.skip(
            "Docker is required for future testcontainers integration tests; Docker CLI was not found."
        )

    assert shutil.which("docker") is not None
