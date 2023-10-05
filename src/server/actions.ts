"use server";

import { Category, Checkout, Product } from "@/types";
import { categories } from "@/server/temp-data/categories";
import { checkout } from "@/server/temp-data/checkout";
import { categoryPizza } from "@/server/temp-data/pizza";
import { categorySushi } from "@/server/temp-data/sushi";
import { categoryWok } from "@/server/temp-data/wok";
import { categoryBurger } from "@/server/temp-data/burger";
import { categoryDessert } from "@/server/temp-data/dessert";
import { categoryRoll } from "@/server/temp-data/roll";

export const GetCategories = async (): Promise<Category[]> => {
  // Imitate fetching
  await new Promise((resolve) => {
    setTimeout(() => resolve("OK"), 600);
  });

  return categories;
};

export const GetProductsInCategory = async (
  id: string,
): Promise<Product[] | null> => {
  // Imitate fetching
  await new Promise((resolve) => {
    setTimeout(() => resolve("OK"), 600);
  });

  // Find products
  if (id === "1") return categoryPizza;
  if (id === "2") return categorySushi;
  if (id === "3") return categoryWok;
  if (id === "4") return categoryBurger;
  if (id === "5") return categoryDessert;
  if (id === "6") return categoryRoll;

  return null;
};

export const GetCheckout = async (): Promise<Checkout> => {
  // Imitate fetching
  await new Promise((resolve) => {
    setTimeout(() => resolve("OK"), 600);
  });

  return checkout;
};
