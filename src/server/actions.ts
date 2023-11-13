"use server";

import { Checkout, MainAPI } from "@next-orders/api-sdk";
import { revalidateTag } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "no-api-url-env";

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
