import { create } from 'zustand';

interface UIState {
  isNavbarOpened: boolean;
  closeNavbar: () => void;
  toggleNavbar: () => void;
  isCartDrawerOpened: boolean;
  closeCartDrawer: () => void;
  toggleCartDrawer: () => void;
  isDeliveryInfoModalOpened: boolean;
  closeDeliveryInfoModal: () => void;
  toggleDeliveryInfoModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isNavbarOpened: false,
  closeNavbar: () => set(() => ({ isNavbarOpened: false })),
  toggleNavbar: () =>
    set(({ isNavbarOpened }) => ({ isNavbarOpened: !isNavbarOpened })),
  isCartDrawerOpened: false,
  closeCartDrawer: () => set(() => ({ isCartDrawerOpened: false })),
  toggleCartDrawer: () =>
    set(({ isCartDrawerOpened }) => ({
      isCartDrawerOpened: !isCartDrawerOpened,
    })),
  isDeliveryInfoModalOpened: false,
  closeDeliveryInfoModal: () =>
    set(() => ({ isDeliveryInfoModalOpened: false })),
  toggleDeliveryInfoModal: () =>
    set(({ isDeliveryInfoModalOpened }) => ({
      isDeliveryInfoModalOpened: !isDeliveryInfoModalOpened,
    })),
}));
