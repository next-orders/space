import { createZodDto } from 'nestjs-zod';
import { EmployeeContactCreateRequestSchema } from '@next-orders/api-sdk';

export class CreateEmployeeContactDto extends createZodDto(
  EmployeeContactCreateRequestSchema
) {}
