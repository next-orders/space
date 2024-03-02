import { NextFetchRequestConfig } from '../types/next';
import {
  CheckoutAddOneToLineResponse,
  CheckoutChangeDeliveryMethodRequest,
  CheckoutChangeDeliveryMethodResponse,
  CheckoutCreateRequest,
  CheckoutCreateResponse,
  CheckoutRemoveOneFromLineResponse,
  ProductVariantAddToCheckoutRequest,
  ProductVariantAddToCheckoutResponse,
} from '../endpoints';
import type { Checkout } from '../types/objects';
import { ErrorBase } from '../errors';
import { fetchAPI } from '../fetchAPI';

export class CheckoutEntity {
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

  public async get(id: string, externalConfig?: NextFetchRequestConfig) {
    return this.request<Checkout>(
      `checkout/${id}`,
      'GET',
      undefined,
      externalConfig,
    );
  }

  public async create(
    data: CheckoutCreateRequest,
    externalConfig?: NextFetchRequestConfig,
  ) {
    return this.request<CheckoutCreateResponse>(
      'checkout',
      'POST',
      data,
      externalConfig,
    );
  }

  public async changeDeliveryMethod(
    checkoutId: string,
    data: CheckoutChangeDeliveryMethodRequest,
    externalConfig?: NextFetchRequestConfig,
  ) {
    return this.request<CheckoutChangeDeliveryMethodResponse>(
      `checkout/${checkoutId}/method`,
      'POST',
      data,
      externalConfig,
    );
  }

  public async addProduct(
    checkoutId: string,
    data: ProductVariantAddToCheckoutRequest,
    externalConfig?: NextFetchRequestConfig,
  ) {
    return this.request<ProductVariantAddToCheckoutResponse>(
      `checkout/${checkoutId}/add`,
      'POST',
      data,
      externalConfig,
    );
  }

  public async addOneToCheckoutLine(
    checkoutId: string,
    lineId: string,
    externalConfig?: NextFetchRequestConfig,
  ) {
    return this.request<CheckoutAddOneToLineResponse>(
      `checkout/${checkoutId}/${lineId}/add-one`,
      'POST',
      undefined,
      externalConfig,
    );
  }

  public async removeOneFromCheckoutLine(
    checkoutId: string,
    lineId: string,
    externalConfig?: NextFetchRequestConfig,
  ) {
    return this.request<CheckoutRemoveOneFromLineResponse>(
      `checkout/${checkoutId}/${lineId}/remove-one`,
      'POST',
      undefined,
      externalConfig,
    );
  }
}
