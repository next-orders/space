import { Injectable } from '@nestjs/common';
import type { EmployeeContactType } from '@next-orders/api-sdk';
import { PrismaService } from '../../../db/prisma.service';
import { EmployeeContactEntity } from '../entities';
import { EmployeeContactMapper } from '../mappers';

@Injectable()
export class EmployeeContactRepository {
  constructor(
    private readonly mapper: EmployeeContactMapper,
    private readonly prisma: PrismaService,
  ) {}

  async create(data: EmployeeContactEntity): Promise<EmployeeContactEntity> {
    const employeeContact = await this.prisma.employeeContact.create({ data });
    return this.mapper.toEntity(employeeContact);
  }

  async findByValueAndType(
    value: string,
    type: EmployeeContactType,
  ): Promise<EmployeeContactEntity | null> {
    const contact = await this.prisma.employeeContact.findFirst({
      where: { value, type },
    });
    return contact ? this.mapper.toEntity(contact) : null;
  }
}
