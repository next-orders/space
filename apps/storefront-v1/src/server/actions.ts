'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import {
  CheckoutDeliveryMethod,
  MainAPI,
  ProductVariant,
} from '@next-orders/api-sdk';
import { COOKIES_CHECKOUT_ID } from '../client/helpers';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'no-api-url-env';
const CHANNEL_ID = process.env.NEXT_PUBLIC_CHANNEL_ID ?? 'no-channel-id-env';

const api = new MainAPI(API_URL, ''); // Public only

const MAX_CACHE_SECONDS = 10800; // 3 hours

export const AddProductToCheckout = async (productVariantId: string) => {
  const checkoutId = await GetCheckoutId();
  if (!checkoutId) {
    return null;
  }

  const add = await api.checkout.addProduct(
    checkoutId,
    { productVariantId },
    {
      next: { revalidate: 0 },
    },
  );
  if (!add || add instanceof Error) {
    return null;
  }

  // On success: Revalidate Checkout
  revalidateTag('checkout');

  return add;
};

export const AddOneToCheckoutLine = async (lineId: string) => {
  const checkoutId = await GetCheckoutId();
  if (!checkoutId) {
    return null;
  }

  const change = await api.checkout.addOneToCheckoutLine(checkoutId, lineId, {
    next: { revalidate: 0 },
  });
  if (!change || change instanceof Error) {
    return null;
  }

  // On success: Revalidate Checkout
  revalidateTag('checkout');

  return change;
};

export const RemoveOneFromCheckoutLine = async (lineId: string) => {
  const checkoutId = await GetCheckoutId();
  if (!checkoutId) {
    return null;
  }

  const change = await api.checkout.removeOneFromCheckoutLine(
    checkoutId,
    lineId,
    {
      next: { revalidate: 0 },
    },
  );
  if (!change || change instanceof Error) {
    return null;
  }

  // On success: Revalidate Checkout
  revalidateTag('checkout');

  return change;
};

export const ChangeCheckoutDeliveryMethod = async (
  method: CheckoutDeliveryMethod,
) => {
  const checkoutId = await GetCheckoutId();
  if (!checkoutId) {
    return null;
  }

  const change = await api.checkout.changeDeliveryMethod(
    checkoutId,
    { method },
    {
      next: { revalidate: 0 },
    },
  );
  if (!change || change instanceof Error) {
    return null;
  }

  // On success: Revalidate Checkout
  revalidateTag('checkout');

  return change;
};

export const GetCheckoutId = async (): Promise<string | null> => {
  const id = cookies().get(COOKIES_CHECKOUT_ID)?.value;
  if (id) {
    // Already exist
    return id;
  }

  const newCheckout = await api.checkout.create({
    deliveryMethod: 'DELIVERY',
    channelId: CHANNEL_ID,
  });
  if (!newCheckout || newCheckout instanceof Error) {
    return null;
  }

  // Update cookies
  SetCheckoutId(newCheckout.result.id);

  return newCheckout.result.id;
};

export const SetCheckoutId = (checkoutId: string) => {
  cookies().set(COOKIES_CHECKOUT_ID, checkoutId);
};

export const SearchInMenu = async (menuId: string, query: string) => {
  const found = await api.menu.search(menuId, query.toLowerCase(), {
    next: { revalidate: 120, tags: ['all', 'search', `search-query-${query}`] },
  });
  if (!found || found instanceof Error) {
    return null;
  }

  return found;
};

export const GetTopSearch = async (
  menuId: string,
): Promise<ProductVariant[] | null> => {
  const top = await api.menu.getTopSearch(menuId, {
    next: {
      revalidate: MAX_CACHE_SECONDS,
      tags: ['all', 'search', 'top-search'],
    },
  });
  if (!top || top instanceof Error) {
    return null;
  }

  return top;
};
