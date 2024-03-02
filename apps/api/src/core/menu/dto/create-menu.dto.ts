import { createZodDto } from 'nestjs-zod';
import { MenuCreateRequestSchema } from '@next-orders/api-sdk';

export class CreateMenuDto extends createZodDto(MenuCreateRequestSchema) {}
