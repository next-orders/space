import { Locale } from '../dictionaries';
import { MenuCategoryIcon } from '@next-orders/api-sdk';

export const COOKIES_ACCESS_TOKEN_KEY = 'next-orders.access-token';
export const COOKIES_LOCALE_KEY = 'next-orders.locale';

export const getColorByClientLevel = (level: number) => {
  if (level < 10) return 'amber';
  if (level < 20) return 'green';
  if (level < 30) return 'blue';
  if (level < 40) return 'teal';
  if (level < 50) return 'pink';

  return 'violet';
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
      return 'ES';
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
