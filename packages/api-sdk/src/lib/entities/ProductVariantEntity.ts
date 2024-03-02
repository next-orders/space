import { NextFetchRequestConfig } from '../types/next';
import {
  ProductVariantCreateRequest,
  ProductVariantCreateResponse,
} from '../endpoints';
import type { ProductVariant } from '../types/objects';
import { ErrorBase } from '../errors';
import { fetchAPI } from '../fetchAPI';

export class ProductVariantEntity {
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

  public async listInCategory(
    categoryId: string,
    externalConfig?: NextFetchRequestConfig,
  ) {
    return this.request<ProductVariant[]>(
      `product-variant/category/${categoryId}`,
      'GET',
      undefined,
      externalConfig,
    );
  }

  public async getById(id: string, externalConfig?: NextFetchRequestConfig) {
    return this.request<ProductVariant>(
      `product-variant/${id}`,
      'GET',
      undefined,
      externalConfig,
    );
  }

  public async getBySlug(
    slug: string,
    externalConfig?: NextFetchRequestConfig,
  ) {
    return this.request<ProductVariant>(
      `product-variant/slug/${slug}`,
      'GET',
      undefined,
      externalConfig,
    );
  }

  public async addMedia(
    productVariantId: string,
    mediaId: string,
    externalConfig?: NextFetchRequestConfig,
  ) {
    return this.request<ProductVariant>(
      `product-variant/${productVariantId}/media/${mediaId}`,
      'POST',
      undefined,
      externalConfig,
    );
  }

  public async create(
    data: ProductVariantCreateRequest,
    externalConfig?: NextFetchRequestConfig,
  ) {
    return this.request<ProductVariantCreateResponse>(
      'product-variant',
      'POST',
      data,
      externalConfig,
    );
  }
}
