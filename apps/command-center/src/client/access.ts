import { cookies } from 'next/headers';
import { COOKIES_ACCESS_TOKEN_KEY } from '@/lib/helpers';
import { MainAPI } from '@next-orders/api-sdk';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'no-api-url-env';

const MAX_CACHE_SECONDS = 0; // no data cache

const nextConfig = {
  // Problem: on build time Next try to fetch API, which is not declared. Empty data on deploy, until revalidation.
  // Solution: set revalidate to 0
  revalidate: process.env.DATA_CACHE_DISABLED ? 0 : MAX_CACHE_SECONDS,
};

export const apiWithAccess = () => {
  const accessToken = cookies().get(COOKIES_ACCESS_TOKEN_KEY)?.value || '';
  return new MainAPI(API_URL, accessToken);
};

/** Need Permission READ_MEDIA */
export const GetAllMedia = async () => {
  return apiWithAccess().media.list({
    next: {
      ...nextConfig,
      tags: ['all', 'media'],
    },
  });
};

/** Need Permission READ_CLIENTS */
export const GetClients = async () => {
  return apiWithAccess().client.list({
    next: { ...nextConfig, tags: ['all', 'clients'] },
  });
};

/** Need Permission READ_CLIENTS */
export const GetClientById = async (id: string) => {
  return apiWithAccess().client.getById(id, {
    next: { ...nextConfig, tags: ['all', `client-${id}`] },
  });
};
