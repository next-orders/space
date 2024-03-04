import { Injectable } from '@nestjs/common';
import { PrismaModels } from '../../../db/prisma.service';
import { EmployeeEntity } from '../entities';

export type ModelEmployee = PrismaModels['Employee'];

@Injectable()
export class EmployeeMapper {
  toEntity(employee: ModelEmployee): EmployeeEntity {
    return employee;
  }
}
