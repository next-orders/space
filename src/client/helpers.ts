import type { ProductVariant, WeightUnit } from "@next-orders/api-sdk";
import { getDictionary, Locale } from "@/dictionaries";

export const COOKIES_CHECKOUT_ID = "next-orders.checkout-id";
export const DEFAULT_IMAGE_URL = "/static/no-image-zinc.png";

export const getCurrencySign = (
  code: "RUB" | "USD" | string | null | undefined,
) => {
  switch (code) {
    case "RUB":
      return "₽";
    case "USD":
      return "$";
    default:
      return "";
  }
};

export const getProductFirstPhoto = (media: ProductVariant["media"]) =>
  media?.length ? media[0].media : undefined;

export const getWeightLocalizedUnit = (unit: WeightUnit, locale: Locale) => {
  const {
    GRAM_SHORT_LABEL,
    KG_SHORT_LABEL,
    ML_SHORT_LABEL,
    L_SHORT_LABEL,
    LB_SHORT_LABEL,
    OZ_SHORT_LABEL,
  } = getDictionary(locale);

  switch (unit) {
    case "G":
      return GRAM_SHORT_LABEL;
    case "KG":
      return KG_SHORT_LABEL;
    case "ML":
      return ML_SHORT_LABEL;
    case "L":
      return L_SHORT_LABEL;
    case "LB":
      return LB_SHORT_LABEL;
    case "OZ":
      return OZ_SHORT_LABEL;
    default:
      return "";
  }
};

export const getBrowserLocale = (
  acceptLanguage: unknown | null | undefined,
): Locale => {
  if (!acceptLanguage || typeof acceptLanguage !== "string") {
    return "EN";
  }

  const browserLanguage = acceptLanguage.toLowerCase().split(",", 2);
  if (!browserLanguage[0]) {
    console.warn(`Not found lang in headers: ${browserLanguage}`);
    return "EN";
  }

  switch (browserLanguage[0]) {
    case "ru":
    case "ru-ru":
    case "ru-ua":
    case "ru-by":
    case "ru-kz":
      return "RU";
    case "en":
    case "en-us":
    case "en-gb":
      return "EN";
    default:
      console.warn(
        `Not found available lang: ${browserLanguage}. Returning default EN.`,
      );
      return "EN";
  }
};

export const getIconUrl = (icon: string | null) => {
  if (!icon) {
    return "/static/food-icon/DEFAULT.png";
  }

  return `/static/food-icon/${icon}.png`;
};
