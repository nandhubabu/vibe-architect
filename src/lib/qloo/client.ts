import { QLOO_CONFIG } from './config';

export class QlooApiError extends Error {
  statusCode: number;
  data?: unknown;

  constructor(message: string, statusCode = 500, data?: unknown) {
    super(message);
    this.name = 'QlooApiError';
    this.statusCode = statusCode;
    this.data = data;
  }
}

/**
 * Executes an authorized request to the Qloo Hackathon API.
 */
export async function qlooFetch<T = unknown>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const apiKey = process.env.QLOO_API_KEY || QLOO_CONFIG.apiKey;
  const baseUrl = process.env.QLOO_BASE_URL || QLOO_CONFIG.baseUrl;

  if (!apiKey || apiKey.trim().length === 0) {
    throw new QlooApiError(
      'Qloo API Key not configured. Using fallback cultural graph.',
      401
    );
  }

  const url = `${baseUrl.replace(/\/+$/, '')}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  const headers = new Headers(options.headers);
  headers.set('X-Api-Key', apiKey);
  headers.set('Accept', 'application/json');

  if (options.body && typeof options.body === 'string' && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), QLOO_CONFIG.timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      let errorBody: unknown;
      try {
        errorBody = await response.json();
      } catch {
        errorBody = await response.text();
      }
      throw new QlooApiError(
        `Qloo API error (${response.status}): ${response.statusText}`,
        response.status,
        errorBody
      );
    }

    return (await response.json()) as T;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof QlooApiError) {
      throw error;
    }
    throw new QlooApiError(
      `Network or timeout failure communicating with Qloo API: ${(error as Error).message}`,
      500
    );
  }
}
