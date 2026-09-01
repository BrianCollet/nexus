import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { App } from './App';

const fetchMock = vi.fn();

beforeEach(() => {
  vi.stubGlobal('fetch', fetchMock);
});

afterEach(() => {
  vi.unstubAllGlobals();
  fetchMock.mockReset();
});

describe('App', () => {
  it('renders backend health success and configured API links', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ status: 'ok', service: 'nexus-backend', environment: 'development' }),
    });

    render(<App />);

    expect(screen.getByText(/checking backend health/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/available: nexus-backend is ok in development/i)).toBeInTheDocument();
    });

    expect(screen.getByRole('link', { name: /open backend api docs/i })).toHaveAttribute(
      'href',
      'http://127.0.0.1:8000/docs',
    );
    expect(screen.getByRole('link', { name: /open openapi schema/i })).toHaveAttribute(
      'href',
      'http://127.0.0.1:8000/openapi.json',
    );
  });

  it('renders an error state and retries the health check', async () => {
    fetchMock
      .mockResolvedValueOnce({ ok: false, status: 503, json: async () => ({}) })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ status: 'ok', service: 'nexus-backend', environment: 'development' }),
      });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/unavailable: backend health check failed with http 503/i)).toBeInTheDocument();
    });

    await userEvent.click(screen.getByRole('button', { name: /retry/i }));

    await waitFor(() => {
      expect(screen.getByText(/available: nexus-backend is ok in development/i)).toBeInTheDocument();
    });
  });
});