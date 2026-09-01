export type BackendHealth = {
  status: string;
  service: string;
  environment: string;
};

export async function fetchBackendHealth(apiBaseUrl: string): Promise<BackendHealth> {
  const response = await fetch(`${apiBaseUrl}/health`);

  if (!response.ok) {
    throw new Error(`Backend health check failed with HTTP ${response.status}`);
  }

  return response.json() as Promise<BackendHealth>;
}