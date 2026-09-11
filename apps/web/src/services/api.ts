import type { HealthResponse } from "../types/health";

const API_BASE_URL=import.meta.env.VITE_API_URL;

if (!API_BASE_URL){
    throw new Error('VITE_API_URL is not defined');
}

export async function apiRequest<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(
      `API request failed: ${response.status} ${response.statusText}`,
    );
  }

  return response.json() as Promise<T>;
}

export function getHealth(): Promise<HealthResponse> {
    return apiRequest<HealthResponse>('/health');
}
/*
    getHealth()
    getCompanies()
    getVacancies()
    getApplications()
*/