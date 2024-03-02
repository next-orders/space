import { NextFetchRequestConfig } from '../types/next';
import { ShopCreateRequest, ShopCreateResponse } from '../endpoints';
import { ErrorBase } from '../errors';
import { Shop } from '../types/objects';
import { fetchAPI } from '../fetchAPI';

interface IShopEntity {
  get: (externalConfig?: NextFetchRequestConfig) => Promise<Shop | ErrorBase>;
  create: (
    data: ShopCreateRequest,
    externalConfig?: NextFetchRequestConfig,
  ) => Promise<ShopCreateResponse | ErrorBase>;
}

export class ShopEntity implements IShopEntity {
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

  public async get(externalConfig?: NextFetchRequestConfig) {
    return this.request<Shop>(`shop`, 'GET', undefined, externalConfig);
  }

  public async create(
    data: ShopCreateRequest,
    externalConfig?: NextFetchRequestConfig,
  ) {
    return this.request<ShopCreateResponse>(
      'shop',
      'POST',
      data,
      externalConfig,
    );
  }
}
