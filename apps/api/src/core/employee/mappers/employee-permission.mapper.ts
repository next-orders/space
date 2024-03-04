import { Injectable } from '@nestjs/common';
import { EmployeePermissionType } from '@next-orders/api-sdk';
import { PrismaModels } from '../../../db/prisma.service';
import { EmployeePermissionEntity } from '../entities';

export type ModelEmployeePermission = PrismaModels['EmployeePermission'];

@Injectable()
export class EmployeePermissionMapper {
  toEntity(
    employeePermission: ModelEmployeePermission,
  ): EmployeePermissionEntity {
    return {
      ...employeePermission,
      type: employeePermission.type as EmployeePermissionType,
    };
  }
}
