import { NextFetchRequestConfig } from '../types/next';
import { ChannelCreateRequest, ChannelCreateResponse } from '../endpoints';
import type { Channel } from '../types/objects';
import { ErrorBase } from '../errors';
import { fetchAPI } from '../fetchAPI';

export class ChannelEntity {
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

  public async get(channelId: string, externalConfig?: NextFetchRequestConfig) {
    return this.request<Channel>(
      `channel/${channelId}`,
      'GET',
      undefined,
      externalConfig,
    );
  }

  public async list(externalConfig?: NextFetchRequestConfig) {
    return this.request<Channel[]>(
      'channel/list',
      'GET',
      undefined,
      externalConfig,
    );
  }

  public async create(
    data: ChannelCreateRequest,
    externalConfig?: NextFetchRequestConfig,
  ) {
    return this.request<ChannelCreateResponse>(
      'channel',
      'POST',
      data,
      externalConfig,
    );
  }
}
