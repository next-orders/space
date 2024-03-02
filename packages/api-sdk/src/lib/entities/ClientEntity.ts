import { NextFetchRequestConfig } from '../types/next';
import type { Client } from '../types/objects';
import { ErrorBase } from '../errors';
import { fetchAPI } from '../fetchAPI';

export class ClientEntity {
  private readonly apiUrl: string;
  private readonly apiToken: string;

  constructor(apiUrl: string, apiToken: string) {
    this.apiUrl = apiUrl;
    this.apiToken = apiToken;
  }

  private async request<T, E = ErrorBase>(
    endpoint: string,
    method: 'POST' | 'GET' | 'PATCH' = 'POST',
    data?: unknown,
    externalConfig?: NextFetchRequestConfig,
  ): Promise<T | E> {
    return fetchAPI<T, E>(
      {
        token: this.apiToken,
        url: this.apiUrl,
      },
      endpoint,
      {
        body: JSON.stringify(data),
        method,
      },
      externalConfig,
    );
  }

  public async list(externalConfig?: NextFetchRequestConfig) {
    return this.request<Client[]>(
      'client/list',
      'GET',
      undefined,
      externalConfig,
    );
  }

  public async getById(
    clientId: string,
    externalConfig?: NextFetchRequestConfig,
  ) {
    return this.request<Client>(
      `client/${clientId}`,
      'GET',
      undefined,
      externalConfig,
    );
  }
}
