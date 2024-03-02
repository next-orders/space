import { z } from 'zod';
import { Shop } from '../types/objects';

export const ShopCreateRequestSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
});

export type ShopCreateRequest = z.infer<typeof ShopCreateRequestSchema>;
export type ShopCreateResponse = {
  ok: boolean;
  result: Shop;
};
