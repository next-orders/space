import { NextFetchRequestConfig } from '../types/next';
import { UploadMediaResponse } from '../endpoints';
import type { Media } from '../types/objects';
import { ErrorBase } from '../errors';
import { fetchAPI } from '../fetchAPI';

export class MediaEntity {
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

  private async requestWithFiles<T, E = ErrorBase>(
    endpoint: string,
    data: unknown,
    externalConfig?: NextFetchRequestConfig,
  ): Promise<T | E> {
    return fetchAPI<T, E>(
      {
        token: this.apiToken,
        url: this.apiUrl,
      },
      endpoint,
      {
        body: data as BodyInit,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.apiToken}`,
        },
      },
      externalConfig,
    );
  }

  public async list(externalConfig?: NextFetchRequestConfig) {
    return this.request<Media[]>(
      'media/list',
      'GET',
      undefined,
      externalConfig,
    );
  }

  public async upload(data: FormData, externalConfig?: NextFetchRequestConfig) {
    return this.requestWithFiles<UploadMediaResponse>(
      'media/upload',
      data,
      externalConfig,
    );
  }
}
