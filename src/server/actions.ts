"use server";

import { Category, Checkout, Product } from "@/types";

export const GetCategories = async () => {
  const res = await fetch("https://v1.next-orders.org/api/category/list", {
    method: "GET",
    next: {
      revalidate: 10,
    },
  });
  if (!res.ok) {
    return null;
  }

  return (await res.json()) as Category[];
};

export const GetProductsInCategory = async (id: string) => {
  const res = await fetch(
    `https://v1.next-orders.org/api/product/category/${id}`,
    {
      method: "GET",
      next: {
        revalidate: 10,
      },
    },
  );
  if (!res.ok) {
    return null;
  }

  return (await res.json()) as Product[] | null;
};

export const GetCheckout = async () => {
  const id = 123;

  const res = await fetch(`https://v1.next-orders.org/api/checkout/${id}`, {
    method: "GET",
    next: {
      revalidate: 1,
    },
  });
  if (!res.ok) {
    return null;
  }

  return (await res.json()) as Checkout;
};
