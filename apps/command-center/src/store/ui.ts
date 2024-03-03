import { create } from 'zustand';

interface UIState {
  isNavbarOpened: boolean;
  closeNavbar: () => void;
  toggleNavbar: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isNavbarOpened: false,
  closeNavbar: () => set(() => ({ isNavbarOpened: false })),
  toggleNavbar: () =>
    set(({ isNavbarOpened }) => ({ isNavbarOpened: !isNavbarOpened })),
}));
