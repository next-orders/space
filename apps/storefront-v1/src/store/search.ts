import { create } from 'zustand';
import { ProductVariant } from '@next-orders/api-sdk';
import { GetTopSearch, SearchInMenu } from '../server/actions';

interface SearchState {
  query: string;
  // eslint-disable-next-line no-unused-vars
  setQuery: (menuId: string, query: string) => void;
  searchResults: ProductVariant[];
  topSearchResults: ProductVariant[];
  // eslint-disable-next-line no-unused-vars
  setTopSearchResults: (menuId: string) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  query: '',
  setQuery: (menuId, query) => {
    SearchInMenu(menuId, query).then((res) => {
      if (!res) return;

      set(() => ({ searchResults: res }));
    });
    set(() => ({ query: query }));
  },
  searchResults: [],
  topSearchResults: [],
  setTopSearchResults: (menuId) => {
    GetTopSearch(menuId).then((res) => {
      if (!res) return;

      set(() => ({ topSearchResults: res }));
    });
  },
}));
