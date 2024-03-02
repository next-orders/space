import { Injectable } from '@nestjs/common';
import { EmployeeContactType } from '@next-orders/api-sdk';
import { PrismaModels } from '@/db/prisma.service';
import { EmployeeContactEntity } from '@/core/employee/entities';

export type ModelEmployeeContact = PrismaModels['EmployeeContact'];

@Injectable()
export class EmployeeContactMapper {
  toEntity(employeeContact: ModelEmployeeContact): EmployeeContactEntity {
    return {
      ...employeeContact,
      type: employeeContact.type as EmployeeContactType,
    };
  }
}
