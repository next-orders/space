import { createZodDto } from 'nestjs-zod';
import { ProductVariantCreateRequestSchema } from '@next-orders/api-sdk';

export class CreateProductVariantDto extends createZodDto(
  ProductVariantCreateRequestSchema
) {}
