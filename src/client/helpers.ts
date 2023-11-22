import type { ProductVariant } from "@next-orders/api-sdk";
import { getDictionary, Locale } from "@/dictionaries";

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

export const getWeightLocalizedUnit = (
  unit: ProductVariant["weightUnit"],
  locale: Locale,
) => {
  const { GRAM_SHORT_LABEL, KG_SHORT_LABEL } = getDictionary(locale);

  switch (unit) {
    case "G":
      return GRAM_SHORT_LABEL;
    case "KG":
      return KG_SHORT_LABEL;
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
      return "RU";
    case "en":
    case "en-us":
      return "EN";
    default:
      console.warn(
        `Not found available lang: ${browserLanguage}. Returning default EN.`,
      );
      return "EN";
  }
};
