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
