import { headers } from "next/headers";
import { MainAPI } from "@next-orders/api-sdk";
import { Locale } from "@/dictionaries";
import { getBrowserLocale } from "@/client/helpers";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "no-api-url-env";
const CHANNEL_ID = process.env.NEXT_PUBLIC_CHANNEL_ID || "no-channel-id-env";

export const apiPublicClient = new MainAPI(API_URL, "");

const MAX_CACHE_SECONDS = 10800; // 3 hours

const nextConfig = {
  // Problem: on build time Next try to fetch API, which is not declared. Empty data on deploy, until revalidation.
  // Solution: set revalidate to 0
  revalidate: process.env.DATA_CACHE_DISABLED ? 0 : MAX_CACHE_SECONDS,
};

export const GetLocale = async (): Promise<Locale> => {
  const language = headers().get("Accept-Language");
  const browserLocale = getBrowserLocale(language);

  const channel = await GetChannel();
  const locale = channel?.languageCode;
  if (!locale) {
    return browserLocale;
  }

  return locale as Locale;
};

export const GetChannel = async () => {
  const channel = await apiPublicClient.getChannel(CHANNEL_ID, {
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
  const menu = await apiPublicClient.getMenuById(id, {
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

export const GetCategories = async (menuId: string) => {
  const categories = await apiPublicClient.getMenuCategories(menuId, {
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
  const category = await apiPublicClient.getMenuCategoryBySlug(slug, {
    next: { ...nextConfig, tags: ["all", `category-${slug}`] },
  });
  if (!category || category instanceof Error) {
    return null;
  }

  return category;
};

export const GetProductsInCategory = async (id: string) => {
  const products = await apiPublicClient.getProductVariantsInCategory(id, {
    next: { ...nextConfig, tags: ["all", `category-products-${id}`] },
  });
  if (!products || products instanceof Error) {
    return null;
  }

  return products;
};

export const GetProductBySlug = async (slug: string) => {
  const product = await apiPublicClient.getProductVariantBySlug(slug, {
    next: { ...nextConfig, tags: ["all", `product-${slug}`] },
  });
  if (!product || product instanceof Error) {
    return null;
  }

  return product;
};
