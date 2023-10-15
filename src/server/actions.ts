"use server";

import { MainAPI } from "@next-orders/api-sdk";

const api = new MainAPI(
  process.env.API_URL || "no-api-url-env",
  process.env.API_PRIVATE_TOKEN || "no-api-private-token-env",
);

const MAX_CACHE_SECONDS = 10800; // 3 hours

const nextConfig = {
  // Problem: on build time Next try to fetch API, which is not declared. Empty data on deploy, until revalidation.
  // Solution: set revalidate to 0
  revalidate: process.env.DATA_CACHE_DISABLED ? 0 : MAX_CACHE_SECONDS,
};

export const GetCategories = async () => {
  const categories = await api.getCategories({
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
  const category = await api.getCategoryBySlug(slug, {
    next: { ...nextConfig, tags: ["all", `category-${slug}`] },
  });
  if (!category || category instanceof Error) {
    return null;
  }

  return category;
};

export const GetProductsInCategory = async (id: string) => {
  const products = await api.getProductsInCategory(id, {
    next: { ...nextConfig, tags: ["all", `category-products-${id}`] },
  });
  if (!products || products instanceof Error) {
    return null;
  }

  return products;
};

export const GetProductBySlug = async (slug: string) => {
  const product = await api.getProductBySlug(slug, {
    next: { ...nextConfig, tags: ["all", `product-${slug}`] },
  });
  if (!product || product instanceof Error) {
    return null;
  }

  return product;
};

export const GetCheckout = async (id: string) => {
  const checkout = await api.getCheckout(id, {
    next: { ...nextConfig, tags: ["all", `checkout-${id}`] },
  });
  if (!checkout || checkout instanceof Error) {
    return null;
  }

  return checkout;
};
