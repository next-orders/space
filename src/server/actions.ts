"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { Checkout, MainAPI } from "@next-orders/api-sdk";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "no-api-url-env";
const CHANNEL_ID = process.env.NEXT_PUBLIC_CHANNEL_ID || "no-channel-id-env";

const COOKIES_CHECKOUT_ID = "next-orders.checkout-id";

const api = new MainAPI(API_URL, ""); // Public only

export const AddProductToCheckout = async (
  checkoutId: string,
  productVariantId: string,
) => {
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

export const AddOneToCheckoutLine = async (
  checkoutId: string,
  lineId: string,
) => {
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

export const RemoveOneFromCheckoutLine = async (
  checkoutId: string,
  lineId: string,
) => {
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
  checkoutId: string,
  method: Checkout["deliveryMethod"],
) => {
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

export const GetCheckout = async (): Promise<Checkout | null> => {
  const id = cookies().get(COOKIES_CHECKOUT_ID)?.value;
  if (!id) {
    // Need to create new Checkout
    const newCheckout = await api.createCheckout({
      deliveryMethod: "DELIVERY",
      channelId: CHANNEL_ID,
    });
    if (!newCheckout || newCheckout instanceof Error) {
      return null;
    }

    // Update cookies
    cookies().set(COOKIES_CHECKOUT_ID, newCheckout.result.id);

    return newCheckout.result;
  }

  const checkout = await api.getCheckout(id, {
    next: { revalidate: 0, tags: ["all", "checkout", `checkout-${id}`] },
  });
  if (!checkout || checkout instanceof Error) {
    return null;
  }

  return checkout;
};
