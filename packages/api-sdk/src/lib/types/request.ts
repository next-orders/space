import { ErrorBase } from '../errors';
import { NextFetchRequestConfig } from './next';

export type RequestAPI = <T, E = ErrorBase>(
  endpoint: string,
  method?: 'POST' | 'GET' | 'PATCH',
  data?: unknown,
  externalConfig?: NextFetchRequestConfig | undefined,
) => Promise<T | E>;

export type RequestAPIWithFiles = <T, E = ErrorBase>(
  endpoint: string,
  data: unknown,
  externalConfig?: NextFetchRequestConfig,
) => Promise<T | E>;
