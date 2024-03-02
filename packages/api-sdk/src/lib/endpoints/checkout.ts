import { z } from 'zod';
import { Checkout, CheckoutDeliveryMethod } from '../types/objects';

const deliveryMethods: CheckoutDeliveryMethod[] = ['DELIVERY', 'WAREHOUSE'];

export const CheckoutCreateRequestSchema = z.object({
  channelId: z.string(),
  deliveryMethod: z.enum(deliveryMethods as [string, ...string[]]),
});

export type CheckoutCreateRequest = z.infer<typeof CheckoutCreateRequestSchema>;
export type CheckoutCreateResponse = {
  ok: boolean;
  result: Checkout;
};

export const CheckoutChangeDeliveryMethodRequestSchema = z.object({
  method: z.enum(deliveryMethods as [string, ...string[]]),
});

export type CheckoutChangeDeliveryMethodRequest = z.infer<
  typeof CheckoutChangeDeliveryMethodRequestSchema
>;
export type CheckoutChangeDeliveryMethodResponse = {
  ok: boolean;
  result: Checkout;
};

export type CheckoutAddOneToLineResponse = {
  ok: boolean;
  result: Checkout;
};

export type CheckoutRemoveOneFromLineResponse = {
  ok: boolean;
  result: Checkout;
};
