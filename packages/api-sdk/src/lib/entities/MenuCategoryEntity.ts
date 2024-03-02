import { NextFetchRequestConfig } from '../types/next';
import type { MenuCategory } from '../types/objects';
import {
  MenuCategoryCreateRequest,
  MenuCategoryCreateResponse,
  MenuCategoryUpdateRequest,
  MenuCategoryUpdateResponse,
} from '../endpoints';
import { ErrorBase } from '../errors';
import { fetchAPI } from '../fetchAPI';

export class MenuCategoryEntity {
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

  public async listInMenu(
    menuId: string,
    externalConfig?: NextFetchRequestConfig,
  ) {
    return this.request<MenuCategory[]>(
      `menu-category/${menuId}/list`,
      'GET',
      undefined,
      externalConfig,
    );
  }

  public async getBySlug(
    slug: string,
    externalConfig?: NextFetchRequestConfig,
  ) {
    return this.request<MenuCategory>(
      `menu-category/slug/${slug}`,
      'GET',
      undefined,
      externalConfig,
    );
  }

  public async getById(id: string, externalConfig?: NextFetchRequestConfig) {
    return this.request<MenuCategory>(
      `menu-category/id/${id}`,
      'GET',
      undefined,
      externalConfig,
    );
  }

  public async create(
    data: MenuCategoryCreateRequest,
    externalConfig?: NextFetchRequestConfig,
  ) {
    return this.request<MenuCategoryCreateResponse>(
      'menu-category',
      'POST',
      data,
      externalConfig,
    );
  }

  public async update(
    categoryId: string,
    data: MenuCategoryUpdateRequest,
    externalConfig?: NextFetchRequestConfig,
  ) {
    return this.request<MenuCategoryUpdateResponse>(
      `menu-category/${categoryId}`,
      'PATCH',
      data,
      externalConfig,
    );
  }
}
