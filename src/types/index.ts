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
  variants?: ProductVariant[];
};

export type ProductVariant = {
  id: string;
  name: string;
  sku?: string;
  // product: Product;
  weight?: Weight;
  media?: ProductMedia[];
  pricing?: VariantPricingInfo;
};

export type VariantPricingInfo = {
  onSale: boolean;
  price: TaxedMoney;
};

export type TaxedMoney = {
  currency: string;
  gross: Money;
  net: Money;
  tax: Money;
};

export type Money = {
  currency: string;
  amount: number;
};

export type Weight = {
  unit: "г";
  value: number;
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
