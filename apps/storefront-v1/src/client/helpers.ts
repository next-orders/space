import type {
  CurrencyCode,
  MenuCategoryIcon,
  ProductVariant,
  WeightUnit,
} from '@next-orders/api-sdk';
import { getDictionary, Locale } from '../dictionaries';

export const COOKIES_CHECKOUT_ID = 'next-orders.checkout-id';
export const DEFAULT_IMAGE_URL = '/static/no-image-zinc.png';

export const getCurrencySign = (code: CurrencyCode | null | undefined) => {
  switch (code) {
    case 'RUB':
      return '₽';
    case 'USD':
      return '$';
    case 'EUR':
      return '€';
    default:
      return '';
  }
};

export const getProductFirstPhoto = (media: ProductVariant['media']) =>
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
    case 'G':
      return GRAM_SHORT_LABEL;
    case 'KG':
      return KG_SHORT_LABEL;
    case 'ML':
      return ML_SHORT_LABEL;
    case 'L':
      return L_SHORT_LABEL;
    case 'LB':
      return LB_SHORT_LABEL;
    case 'OZ':
      return OZ_SHORT_LABEL;
    default:
      return '';
  }
};

const ensureLanguage = (acceptLanguage: unknown): string => {
  if (!acceptLanguage || typeof acceptLanguage !== 'string') {
    return 'EN';
  }
  return acceptLanguage;
};

const getPrimaryLanguage = (acceptLanguage: string): string => {
  return acceptLanguage.toLowerCase().split(',', 2)[0];
};

const getSupportedLocale = (browserLanguage: string): Locale => {
  switch (browserLanguage) {
    case 'ru':
    case 'ru-ru':
    case 'ru-ua':
    case 'ru-by':
    case 'ru-kz':
      return 'RU';
    case 'en':
    case 'en-us':
    case 'en-gb':
    case 'en-gr':
      return 'EN';
    case 'es':
    case 'es-es':
    case 'es-mx':
    case 'es-cl':
    case 'es-419':
      return 'ES';
    case 'de':
      return 'DE';
    default:
      console.warn(
        `Not found available lang: ${browserLanguage}. Returning default EN.`,
      );
      return 'EN';
  }
};

export const getBrowserLocale = (acceptLanguage: unknown): Locale => {
  const ensuredLanguage = ensureLanguage(acceptLanguage);
  const primaryLanguage = getPrimaryLanguage(ensuredLanguage);
  return getSupportedLocale(primaryLanguage);
};

export const getIconUrl = (icon: MenuCategoryIcon | null) => {
  if (!icon) {
    return '/static/food-icon/DEFAULT.png';
  }

  return `/static/food-icon/${icon}.png`;
};
