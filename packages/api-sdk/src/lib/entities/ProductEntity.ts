import { NextFetchRequestConfig } from '../types/next';
import { ProductCreateRequest, ProductCreateResponse } from '../endpoints';
import type { Product } from '../types/objects';
import { ErrorBase } from '../errors';
import { fetchAPI } from '../fetchAPI';

export class ProductEntity {
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
    return this.request<Product[]>(
      'product/list',
      'GET',
      undefined,
      externalConfig,
    );
  }

  public async getById(id: string, externalConfig?: NextFetchRequestConfig) {
    return this.request<Product>(
      `product/${id}`,
      'GET',
      undefined,
      externalConfig,
    );
  }

  public async create(
    data: ProductCreateRequest,
    externalConfig?: NextFetchRequestConfig,
  ) {
    return this.request<ProductCreateResponse>(
      'product',
      'POST',
      data,
      externalConfig,
    );
  }
}
