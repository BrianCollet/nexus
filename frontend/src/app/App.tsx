import { useEffect, useState } from 'react';

import { type BackendHealth, fetchBackendHealth } from '../api/health';

type HealthState =
  | { status: 'checking' }
  | { status: 'available'; health: BackendHealth }
  | { status: 'unavailable'; message: string };

const apiBaseUrl = import.meta.env.VITE_NEXUS_API_BASE_URL ?? 'http://127.0.0.1:8000';

export function App() {
  const [healthState, setHealthState] = useState<HealthState>({ status: 'checking' });

  async function checkHealth() {
    setHealthState({ status: 'checking' });

    try {
      const health = await fetchBackendHealth(apiBaseUrl);
      setHealthState({ status: 'available', health });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Backend health check failed.';
      setHealthState({ status: 'unavailable', message });
    }
  }

  useEffect(() => {
    void checkHealth();
  }, []);

  return (
    <main className="app-shell">
      <section className="foundation-panel" aria-labelledby="app-title">
        <p className="eyebrow">Nexus foundation</p>
        <h1 id="app-title">Unified infrastructure control plane</h1>
        <p className="intro">
          The local application skeleton is running. This screen verifies the frontend, backend health endpoint,
          root environment configuration, and API documentation surface.
        </p>

        <div className="status-panel" aria-live="polite">
          <div>
            <p className="label">Backend status</p>
            <HealthSummary state={healthState} />
          </div>
          <button type="button" onClick={() => void checkHealth()}>
            Retry
          </button>
        </div>

        <dl className="details-grid">
          <div>
            <dt>API base URL</dt>
            <dd>{apiBaseUrl}</dd>
          </div>
          <div>
            <dt>OpenAPI docs</dt>
            <dd>
              <a href={`${apiBaseUrl}/docs`}>Open backend API docs</a>
            </dd>
          </div>
          <div>
            <dt>Schema</dt>
            <dd>
              <a href={`${apiBaseUrl}/openapi.json`}>Open OpenAPI schema</a>
            </dd>
          </div>
        </dl>
      </section>
    </main>
  );
}

function HealthSummary({ state }: { state: HealthState }) {
  if (state.status === 'checking') {
    return <p className="status checking">Checking backend health...</p>;
  }

  if (state.status === 'unavailable') {
    return <p className="status unavailable">Unavailable: {state.message}</p>;
  }

  return (
    <p className="status available">
      Available: {state.health.service} is {state.health.status} in {state.health.environment}
    </p>
  );
}