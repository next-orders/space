import { create } from "zustand";
import { ProductVariant } from "@next-orders/api-sdk";
import { SearchInChannel } from "@/server/actions";

interface SearchState {
  query: string;
  // eslint-disable-next-line no-unused-vars
  setQuery: (value: string) => void;
  searchResults: ProductVariant[];
}

export const useSearchStore = create<SearchState>((set) => ({
  query: "",
  setQuery: (query) => {
    SearchInChannel(query).then((res) => {
      if (!res) return;

      set(() => ({ searchResults: res }));
    });
    set(() => ({ query: query }));
  },
  searchResults: [],
}));
