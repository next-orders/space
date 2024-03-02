import { createZodDto } from 'nestjs-zod';
import { CheckoutCreateRequestSchema } from '@next-orders/api-sdk';

export class CreateCheckoutDto extends createZodDto(
  CheckoutCreateRequestSchema
) {}
