import { createZodDto } from 'nestjs-zod';
import { ShopCreateRequestSchema } from '@next-orders/api-sdk';

export class CreateShopDto extends createZodDto(ShopCreateRequestSchema) {}
