import { NextFetchRequestConfig } from '../types/next';
import type { Menu, ProductVariant } from '../types/objects';
import { ErrorBase } from '../errors';
import { fetchAPI } from '../fetchAPI';
import { MenuCreateRequest, MenuCreateResponse } from '../endpoints';

export class MenuEntity {
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

  public async listInChannel(
    channelId: string,
    externalConfig?: NextFetchRequestConfig,
  ) {
    return this.request<Menu[]>(
      `menu/list/${channelId}`,
      'GET',
      undefined,
      externalConfig,
    );
  }

  public async getById(
    menuId: string,
    externalConfig?: NextFetchRequestConfig,
  ) {
    return this.request<Menu>(
      `menu/${menuId}`,
      'GET',
      undefined,
      externalConfig,
    );
  }

  public async search(
    menuId: string,
    query: string,
    externalConfig?: NextFetchRequestConfig,
  ) {
    return this.request<ProductVariant[] | null>(
      `menu/${menuId}/search/${query}`,
      'GET',
      undefined,
      externalConfig,
    );
  }

  public async getTopSearch(
    menuId: string,
    externalConfig?: NextFetchRequestConfig,
  ) {
    return this.request<ProductVariant[] | null>(
      `menu/${menuId}/search`,
      'GET',
      undefined,
      externalConfig,
    );
  }

  public async create(
    data: MenuCreateRequest,
    externalConfig?: NextFetchRequestConfig,
  ) {
    return this.request<MenuCreateResponse>(
      'menu',
      'POST',
      data,
      externalConfig,
    );
  }
}
