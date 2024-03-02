import { createZodDto } from 'nestjs-zod';
import { EmployeePermissionCreateRequestSchema } from '@next-orders/api-sdk';

export class CreateEmployeePermissionDto extends createZodDto(
  EmployeePermissionCreateRequestSchema
) {}
