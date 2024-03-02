import { createZodDto } from 'nestjs-zod';
import { ProductCreateRequestSchema } from '@next-orders/api-sdk';

export class CreateProductDto extends createZodDto(
  ProductCreateRequestSchema
) {}
