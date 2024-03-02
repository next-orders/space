import { createZodDto } from 'nestjs-zod';
import { ChannelCreateRequestSchema } from '@next-orders/api-sdk';

export class CreateChannelDto extends createZodDto(
  ChannelCreateRequestSchema
) {}
