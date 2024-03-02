import { z } from 'zod';
import {
  Checkout,
  Product,
  ProductType,
  ProductVariant,
  WeightUnit,
} from '../types/objects';

const productTypes: ProductType[] = ['PRODUCTION', 'READY', 'INGREDIENT'];

export const ProductCreateRequestSchema = z.object({
  type: z.enum(productTypes as [string, ...string[]]),
  name: z.string(),
  description: z.string().optional(),
});

export type ProductCreateRequest = z.infer<typeof ProductCreateRequestSchema>;
export type ProductCreateResponse = {
  ok: boolean;
  result: Product;
};

const weightUnits: WeightUnit[] = ['G', 'KG', 'ML', 'L', 'LB', 'OZ'];

export const ProductVariantCreateRequestSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  slug: z.string(),
  sku: z.string().optional(),
  weightUnit: z.enum(weightUnits as [string, ...string[]]),
  weightValue: z.number(),
  gross: z.number(),
  net: z.number().optional(),
  tax: z.number().optional(),
  productId: z.string(),
  categoryId: z.string(),
  menuId: z.string(),
});

export type ProductVariantCreateRequest = z.infer<
  typeof ProductVariantCreateRequestSchema
>;
export type ProductVariantCreateResponse = {
  ok: boolean;
  result: ProductVariant;
};

export const ProductVariantAddToCheckoutSchema = z.object({
  productVariantId: z.string(),
});

export type ProductVariantAddToCheckoutRequest = z.infer<
  typeof ProductVariantAddToCheckoutSchema
>;
export type ProductVariantAddToCheckoutResponse = {
  ok: boolean;
  result: Checkout;
};
