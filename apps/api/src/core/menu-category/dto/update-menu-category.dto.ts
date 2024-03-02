import { createZodDto } from 'nestjs-zod';
import { MenuCategoryUpdateRequestSchema } from '@next-orders/api-sdk';

export class UpdateMenuCategoryDto extends createZodDto(
  MenuCategoryUpdateRequestSchema
) {}
