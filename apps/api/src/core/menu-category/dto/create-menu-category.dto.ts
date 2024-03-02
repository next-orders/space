import { createZodDto } from 'nestjs-zod';
import { MenuCategoryCreateRequestSchema } from '@next-orders/api-sdk';

export class CreateMenuCategoryDto extends createZodDto(
  MenuCategoryCreateRequestSchema
) {}
