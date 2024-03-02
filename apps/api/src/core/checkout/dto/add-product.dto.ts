import { createZodDto } from 'nestjs-zod';
import { ProductVariantAddToCheckoutSchema } from '@next-orders/api-sdk';

export class AddProductDto extends createZodDto(
  ProductVariantAddToCheckoutSchema
) {}
