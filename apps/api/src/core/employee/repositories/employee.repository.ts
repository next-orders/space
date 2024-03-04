import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../db/prisma.service';
import { EmployeeEntity } from '../entities';
import { EmployeeMapper } from '../mappers';

@Injectable()
export class EmployeeRepository {
  constructor(
    private readonly mapper: EmployeeMapper,
    private readonly prisma: PrismaService,
  ) {}

  async create(data: EmployeeEntity): Promise<EmployeeEntity> {
    const employee = await this.prisma.employee.create({ data });
    return this.mapper.toEntity(employee);
  }

  async findById(id: string): Promise<EmployeeEntity | null> {
    const employee = await this.prisma.employee.findUnique({ where: { id } });
    return employee ? this.mapper.toEntity(employee) : null;
  }
}
