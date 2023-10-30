"use client";

import { IconShoppingCartPlus } from "@tabler/icons-react";
import { ProductVariant } from "@next-orders/api-sdk";
import { AddProductToCheckout } from "@/server/actions";

type AddToCartProps = {
  product: ProductVariant | null;
};

export const AddToCart = ({ product }: AddToCartProps) => {
  if (!product) return null;

  return (
    <button
      onClick={() => AddProductToCheckout("123", product.id)}
      className="px-5 py-3 flex flex-row gap-2 text-base font-medium cursor-pointer rounded-2xl bg-gradient-to-br from-yellow-200 via-green-200 to-green-300 hover:scale-95 duration-200"
    >
      <IconShoppingCartPlus stroke={1.5} /> Add to Cart
    </button>
  );
};
