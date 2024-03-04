import { TranslationKey } from '../dictionaries';

export type Pages = typeof PAGES;
export type PageKey = keyof Pages;
export type PageHref = Pages[PageKey]['href'];
export type PageRecord = {
  dictionaryKey: TranslationKey;
  href: PageHref;
};

export const PAGES = {
  DASHBOARD: { dictionaryKey: 'DASHBOARD_LABEL', href: '/dashboard' },
  CLIENT_BASE: { dictionaryKey: 'CLIENT_BASE_LABEL', href: '/client' },
  CLIENT_PAGE: { dictionaryKey: 'CLIENT_PAGE_LABEL', href: '#' },
  EMPLOYEE_BASE: {
    dictionaryKey: 'EMPLOYEE_BASE_LABEL',
    href: '/employee',
  },
  CHANNELS: { dictionaryKey: 'CHANNELS_LABEL', href: '/channel' },
  CHANNEL_PAGE: { dictionaryKey: 'CHANNEL_PAGE_LABEL', href: '#' },
  DOMAINS: { dictionaryKey: 'DOMAINS_LABEL', href: '/domain' },
  MEDIA: { dictionaryKey: 'MEDIA_LABEL', href: '/media' },
  PRODUCTS: { dictionaryKey: 'PRODUCTS_LABEL', href: '/product' },
  PRODUCT_PAGE: {
    dictionaryKey: 'PRODUCT_PAGE_LABEL',
    href: '#',
  },
  INGREDIENTS_PAGE: {
    dictionaryKey: 'INGREDIENTS_PAGE_LABEL',
    href: '#',
  },
  PRODUCTION_PAGE: {
    dictionaryKey: 'PRODUCTION_PAGE_LABEL',
    href: '#',
  },
  READY_PAGE: {
    dictionaryKey: 'READY_PAGE_LABEL',
    href: '#',
  },
  MENU_PAGE: { dictionaryKey: 'MENU_PAGE_LABEL', href: '#' },
  MENU_CATEGORY_PAGE: { dictionaryKey: 'MENU_CATEGORY_PAGE_LABEL', href: '#' },
  PRODUCT_VARIANT_PAGE: {
    dictionaryKey: 'PRODUCT_VARIANT_PAGE_LABEL',
    href: '#',
  },
} as const;
