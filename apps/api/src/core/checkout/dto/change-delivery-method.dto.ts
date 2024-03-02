import { createZodDto } from 'nestjs-zod';
import { CheckoutChangeDeliveryMethodRequestSchema } from '@next-orders/api-sdk';

export class ChangeDeliveryMethodDto extends createZodDto(
  CheckoutChangeDeliveryMethodRequestSchema
) {}
