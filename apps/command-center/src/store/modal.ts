import { create } from 'zustand';

interface ModalState {
  // Channel
  isOpenedCreateChannel: boolean;
  toggleCreateChannel: () => void;

  // MenuCategory
  isOpenedCreateMenuCategory: boolean;
  toggleCreateMenuCategory: () => void;
  isOpenedEditMenuCategory: boolean;
  toggleEditMenuCategory: () => void;

  // Media
  isOpenedCreateMedia: boolean;
  toggleCreateMedia: () => void;
  // Production
  isOpenedCreateProduction: boolean;
  toggleCreateProduction: () => void;
  // ProductVariant
  isOpenedCreateProductVariant: boolean;
  toggleCreateProductVariant: () => void;
  // ProductVariant edit Media
  isOpenedEditProductVariantMedia: boolean;
  toggleEditProductVariantMedia: () => void;
  // Product Choose
  isOpenedChooseProduct: boolean;
  toggleChooseProduct: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  entityId: '',
  isOpenedCreateChannel: false,
  toggleCreateChannel: () =>
    set(({ isOpenedCreateChannel }) => ({
      isOpenedCreateChannel: !isOpenedCreateChannel,
    })),
  isOpenedCreateMenuCategory: false,
  toggleCreateMenuCategory: () =>
    set(({ isOpenedCreateMenuCategory }) => ({
      isOpenedCreateMenuCategory: !isOpenedCreateMenuCategory,
    })),
  isOpenedEditMenuCategory: false,
  toggleEditMenuCategory: () =>
    set(({ isOpenedEditMenuCategory }) => ({
      isOpenedEditMenuCategory: !isOpenedEditMenuCategory,
    })),
  isOpenedCreateMedia: false,
  toggleCreateMedia: () =>
    set(({ isOpenedCreateMedia }) => ({
      isOpenedCreateMedia: !isOpenedCreateMedia,
    })),
  isOpenedCreateProduction: false,
  toggleCreateProduction: () =>
    set(({ isOpenedCreateProduction }) => ({
      isOpenedCreateProduction: !isOpenedCreateProduction,
    })),
  isOpenedCreateProductVariant: false,
  toggleCreateProductVariant: () =>
    set(({ isOpenedCreateProductVariant }) => ({
      isOpenedCreateProductVariant: !isOpenedCreateProductVariant,
    })),
  isOpenedEditProductVariantMedia: false,
  toggleEditProductVariantMedia: () =>
    set(({ isOpenedEditProductVariantMedia }) => ({
      isOpenedEditProductVariantMedia: !isOpenedEditProductVariantMedia,
    })),
  isOpenedChooseProduct: false,
  toggleChooseProduct: () =>
    set(({ isOpenedChooseProduct }) => ({
      isOpenedChooseProduct: !isOpenedChooseProduct,
    })),
}));
