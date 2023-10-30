"use client";

import { IconShoppingCartPlus } from "@tabler/icons-react";
import { Channel, ProductVariant } from "@next-orders/api-sdk";
import { AddProductToCheckout } from "@/server/actions";

type AddToCartProps = {
  channel: Channel | null;
  product: ProductVariant | null;
};

export const AddToCart = ({ channel, product }: AddToCartProps) => {
  if (!product) return null;

  const backgroundColor = channel?.accentButtonColor;
  const backgroundImage = `linear-gradient(to bottom right, ${channel?.accentGradientFrom}, ${channel?.accentGradientTo})`;

  return (
    <button
      onClick={() => AddProductToCheckout("123", product.id)}
      className="px-5 py-3 flex flex-row gap-2 text-base font-medium cursor-pointer rounded-2xl hover:scale-95 duration-200"
      style={{ backgroundColor, backgroundImage }}
    >
      <IconShoppingCartPlus stroke={1.5} /> Add to Cart
    </button>
  );
};
