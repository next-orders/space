import { createZodDto } from 'nestjs-zod';
import { EmployeeCreateRequestSchema } from '@next-orders/api-sdk';

export class CreateEmployeeDto extends createZodDto(
  EmployeeCreateRequestSchema
) {}
