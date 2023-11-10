import { create } from "zustand";

interface SearchState {
  search: string;
  // eslint-disable-next-line no-unused-vars
  setSearch: (value: string) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  search: "",
  setSearch: (value) => set(() => ({ search: value })),
}));
