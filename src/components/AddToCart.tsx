"use client";

import { AddProductToCheckout } from "@/server/actions";
import { Button } from "@mantine/core";
import { ProductVariant } from "@next-orders/api-sdk";

type AddToCartProps = {
  product: ProductVariant | null;
};

export const AddToCart = ({ product }: AddToCartProps) => {
  if (!product) return null;

  return (
    <Button
      size="lg"
      className="px-5 bg-emerald-300 hover:bg-emerald-400 rounded-2xl"
      onClick={() => AddProductToCheckout("123", product.id)}
    >
      Add to Cart
    </Button>
  );
};
