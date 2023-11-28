"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { CheckoutDeliveryMethod, MainAPI } from "@next-orders/api-sdk";
import { COOKIES_CHECKOUT_ID } from "@/client/helpers";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "no-api-url-env";
const CHANNEL_ID = process.env.NEXT_PUBLIC_CHANNEL_ID || "no-channel-id-env";

const api = new MainAPI(API_URL, ""); // Public only

export const AddProductToCheckout = async (productVariantId: string) => {
  const checkoutId = await GetCheckoutId();
  if (!checkoutId) {
    return null;
  }

  const add = await api.addProductToCheckout(
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
  revalidateTag("checkout");

  return add;
};

export const AddOneToCheckoutLine = async (lineId: string) => {
  const checkoutId = await GetCheckoutId();
  if (!checkoutId) {
    return null;
  }

  const change = await api.addOneToCheckoutLine(checkoutId, lineId, {
    next: { revalidate: 0 },
  });
  if (!change || change instanceof Error) {
    return null;
  }

  // On success: Revalidate Checkout
  revalidateTag("checkout");

  return change;
};

export const RemoveOneFromCheckoutLine = async (lineId: string) => {
  const checkoutId = await GetCheckoutId();
  if (!checkoutId) {
    return null;
  }

  const change = await api.removeOneFromCheckoutLine(checkoutId, lineId, {
    next: { revalidate: 0 },
  });
  if (!change || change instanceof Error) {
    return null;
  }

  // On success: Revalidate Checkout
  revalidateTag("checkout");

  return change;
};

export const ChangeCheckoutDeliveryMethod = async (
  method: CheckoutDeliveryMethod,
) => {
  const checkoutId = await GetCheckoutId();
  if (!checkoutId) {
    return null;
  }

  const change = await api.changeCheckoutDeliveryMethod(
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
  revalidateTag("checkout");

  return change;
};

export const GetCheckoutId = async (): Promise<string | null> => {
  const id = cookies().get(COOKIES_CHECKOUT_ID)?.value;
  if (id) {
    // Already exist
    return id;
  }

  const newCheckout = await api.createCheckout({
    deliveryMethod: "DELIVERY",
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
