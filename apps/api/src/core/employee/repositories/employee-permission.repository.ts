import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../db/prisma.service';
import { EmployeePermissionEntity } from '../entities';
import { EmployeePermissionMapper } from '../mappers';

@Injectable()
export class EmployeePermissionRepository {
  constructor(
    private readonly mapper: EmployeePermissionMapper,
    private readonly prisma: PrismaService,
  ) {}

  async create(
    data: EmployeePermissionEntity,
  ): Promise<EmployeePermissionEntity> {
    const employeePermission = await this.prisma.employeePermission.create({
      data,
    });
    return this.mapper.toEntity(employeePermission);
  }

  async findAllWithEmployeeId(
    employeeId: string,
  ): Promise<EmployeePermissionEntity[]> {
    const permissions = await this.prisma.employeePermission.findMany({
      where: { employeeId },
    });
    return permissions.map(this.mapper.toEntity);
  }
}
