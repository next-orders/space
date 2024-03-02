import { SignInByEmailRequest, SignInByEmailResponse } from '../endpoints';
import { NextFetchRequestConfig } from '../types/next';
import { ErrorBase } from '../errors';
import { fetchAPI } from '../fetchAPI';
import type { Employee } from '../types/objects';

export class EmployeeEntity {
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

  public async signInByEmail(
    data: SignInByEmailRequest,
    externalConfig?: NextFetchRequestConfig,
  ) {
    return this.request<SignInByEmailResponse>(
      'employee/email',
      'POST',
      data,
      externalConfig,
    );
  }

  public async get(
    employeeId: string,
    externalConfig?: NextFetchRequestConfig,
  ) {
    return this.request<Employee>(
      `employee/${employeeId}`,
      'GET',
      undefined,
      externalConfig,
    );
  }
}
