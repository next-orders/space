import { createZodDto } from 'nestjs-zod';
import { EmployeePasswordCreateRequestSchema } from '@next-orders/api-sdk';

export class CreateEmployeePasswordDto extends createZodDto(
  EmployeePasswordCreateRequestSchema
) {}
