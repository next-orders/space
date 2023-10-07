export type Category = {
  id: string;
  name: string;
  slug: string;
  level: number;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  variants?: ProductVariant[];
};

export type ProductVariant = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  sku?: string | null;
  weightUnit?: string | null;
  weightValue?: number | null;
  onSale: boolean;
  currency?: string | null;
  gross?: number | null;
  net?: number | null;
  tax?: number | null;
  media?: ProductMedia[];
};

export type ProductMedia = {
  id: string;
  alt: string;
  url: string;
};

export type Checkout = {
  id: string;
  lines: CheckoutLine[];
};

export type CheckoutLine = {
  id: string;
  quantity: number;
  variant: ProductVariant;
};
