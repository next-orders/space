"use server";

import { MainAPI } from "@next-orders/api-sdk";
import { revalidateTag } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "no-api-url-env";
const SHOP_ID = process.env.NEXT_PUBLIC_SHOP_ID || "no-shop-id-env";
const CHANNEL_ID = process.env.NEXT_PUBLIC_CHANNEL_ID || "no-channel-id-env";

const api = new MainAPI(API_URL, ""); // Public only

const MAX_CACHE_SECONDS = 10800; // 3 hours

const nextConfig = {
  // Problem: on build time Next try to fetch API, which is not declared. Empty data on deploy, until revalidation.
  // Solution: set revalidate to 0
  revalidate: process.env.DATA_CACHE_DISABLED ? 0 : MAX_CACHE_SECONDS,
};

export const GetShop = async () => {
  const shop = await api.getShop(SHOP_ID, {
    next: {
      ...nextConfig,
      tags: ["all", "shop"],
    },
  });
  if (!shop || shop instanceof Error) {
    return null;
  }

  return shop;
};

export const GetChannel = async () => {
  const channel = await api.getChannel(CHANNEL_ID, {
    next: {
      ...nextConfig,
      tags: ["all", "channel"],
    },
  });
  if (!channel || channel instanceof Error) {
    return null;
  }

  return channel;
};

export const GetMenu = async (id: string) => {
  const menu = await api.getMenuById(id, {
    next: {
      ...nextConfig,
      tags: ["all", `menu-${id}`],
    },
  });
  if (!menu || menu instanceof Error) {
    return null;
  }

  return menu;
};

export const GetCategories = async () => {
  const categories = await api.getMenuCategories({
    next: {
      ...nextConfig,
      tags: ["all", "categories"],
    },
  });
  if (!categories || categories instanceof Error) {
    return null;
  }

  return categories;
};

export const GetCategoryBySlug = async (slug: string) => {
  const category = await api.getMenuCategoryBySlug(slug, {
    next: { ...nextConfig, tags: ["all", `category-${slug}`] },
  });
  if (!category || category instanceof Error) {
    return null;
  }

  return category;
};

export const GetProductsInCategory = async (id: string) => {
  const products = await api.getProductVariantsInCategory(id, {
    next: { ...nextConfig, tags: ["all", `category-products-${id}`] },
  });
  if (!products || products instanceof Error) {
    return null;
  }

  return products;
};

export const GetProductBySlug = async (slug: string) => {
  const product = await api.getProductVariantBySlug(slug, {
    next: { ...nextConfig, tags: ["all", `product-${slug}`] },
  });
  if (!product || product instanceof Error) {
    return null;
  }

  return product;
};

export const GetCheckout = async (id: string) => {
  const checkout = await api.getCheckout(id, {
    next: { revalidate: 0, tags: ["all", "checkout", `checkout-${id}`] },
  });
  if (!checkout || checkout instanceof Error) {
    return null;
  }

  return checkout;
};

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
