"use server";

import { MainAPI } from "@next-orders/api-sdk";
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
