import { ErrorBase } from './errors';
import { NextFetchRequestConfig } from './types/next';

export async function fetchAPI<T = unknown, E = ErrorBase>(
  api: {
    token: string;
    url: string;
  },
  endpoint: string,
  customConfig: RequestInit = {},
  externalConfig: NextFetchRequestConfig = {},
): Promise<T | E> {
  const { body, ...otherConfig } = customConfig;

  const config: RequestInit = {
    method: otherConfig?.method || 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${api.token}`,
    },
    body,
    ...otherConfig,
    ...externalConfig,
  };

  try {
    const response = await fetch(`${api.url}/${endpoint}`, config);
    if (response.ok) {
      return (await response.json()) as T;
    }

    const errorMessage = (await response.json()) as ErrorBase;
    return new ErrorBase(errorMessage.message, errorMessage.statusCode) as E;
  } catch (err) {
    console.warn(err);

    if (err instanceof Error) {
      return new ErrorBase(err.message, 0) as E;
    }

    return err as E;
  }
}
