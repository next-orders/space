import { Locale } from '../dictionaries';
import { cookies, headers } from 'next/headers';
import { COOKIES_LOCALE_KEY, getBrowserLocale } from '../lib/helpers';

export const getLocale = (): Locale => {
  const language = headers().get('Accept-Language');
  const browserLocale = getBrowserLocale(language);

  const localeFromCookies = cookies().get(COOKIES_LOCALE_KEY)?.value;
  if (localeFromCookies) {
    return localeFromCookies as Locale;
  }

  return browserLocale;
};
