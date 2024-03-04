import { PageKey, PAGES } from '../lib/pages';
import type { BreadcrumbLink } from '../types';
import type { Dictionary } from './index';

const createLinkFromPageKey = (
  dictionary: Dictionary,
  pageKey: PageKey,
): BreadcrumbLink => {
  const { dictionaryKey, href } = PAGES[pageKey];
  const title = dictionary[dictionaryKey];

  return { title, href };
};

export const prepareLocalizedLinks = (
  keys: PageKey[],
  dictionary: Dictionary,
): BreadcrumbLink[] =>
  keys.map((key) => createLinkFromPageKey(dictionary, key));
