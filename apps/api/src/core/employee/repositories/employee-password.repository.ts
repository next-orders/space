import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../db/prisma.service';
import { EmployeePasswordEntity } from '../entities';

@Injectable()
export class EmployeePasswordRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: EmployeePasswordEntity): Promise<EmployeePasswordEntity> {
    return this.prisma.employeePassword.create({ data });
  }

  findAllWithEmployeeId(employeeId: string): Promise<EmployeePasswordEntity[]> {
    return this.prisma.employeePassword.findMany({
      where: { employeeId },
    });
  }
}
