import { createZodDto } from 'nestjs-zod';
import { SignInByEmailRequestSchema } from '@next-orders/api-sdk';

export class SignInByEmailDto extends createZodDto(
  SignInByEmailRequestSchema
) {}
