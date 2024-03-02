'use client';

import { IconShoppingCartPlus } from '@tabler/icons-react';
import { Channel, ProductVariant } from '@next-orders/api-sdk';
import { AddProductToCheckout } from '@/server/actions';
import { getDictionary } from '@/dictionaries';

type AddToCartProps = {
  channel: Channel | null;
  product: ProductVariant | null;
};

export const AddToCart = ({ channel, product }: AddToCartProps) => {
  if (!product) return null;

  const backgroundColor = channel?.accentButtonColor;
  const backgroundImage = `linear-gradient(to bottom right, ${channel?.accentGradientFrom}, ${channel?.accentGradientTo})`;

  const locale = channel?.languageCode ?? 'EN';
  const { ADD_TO_CART_LABEL } = getDictionary(locale);

  return (
    <button
      onClick={() => AddProductToCheckout(product.id)}
      className="px-5 py-3 flex flex-row gap-2 text-base font-normal cursor-pointer rounded-2xl active:scale-95 lg:hover:scale-95 lg:active:scale-90 duration-200"
      style={{ backgroundColor, backgroundImage }}
    >
      <IconShoppingCartPlus stroke={1.5} /> {ADD_TO_CART_LABEL}
    </button>
  );
};
