"use server";

import { MainAPI } from "@next-orders/api-sdk";

if (process.env.NODE_ENV === "production" && !process.env.API_URL) {
  throw new Error("No API_URL at env");
}

const api = new MainAPI(process.env.API_URL || "", "supersecret");

export const GetCategories = async () => {
  const categories = await api.getCategories();
  if (!categories || categories instanceof Error) {
    return null;
  }

  return categories;
};

export const GetProductsInCategory = async (id: string) => {
  const products = await api.getProductsInCategory(id);
  if (!products || products instanceof Error) {
    return null;
  }

  return products;
};

export const GetProductBySlug = async (slug: string) => {
  const product = await api.getProductBySlug(slug);
  if (!product || product instanceof Error) {
    return null;
  }

  return product;
};

export const GetCheckout = async (id: string) => {
  const checkout = await api.getCheckout(id);
  if (!checkout || checkout instanceof Error) {
    return null;
  }

  return checkout;
};
