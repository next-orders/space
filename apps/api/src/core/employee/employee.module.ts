import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../db/prisma.service';
import { AuthService } from '../auth/auth.service';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import {
  EmployeeContactRepository,
  EmployeePasswordRepository,
  EmployeePermissionRepository,
  EmployeeRepository,
} from './repositories';
import {
  EmployeeContactMapper,
  EmployeeMapper,
  EmployeePermissionMapper,
} from './mappers';

@Module({
  controllers: [EmployeeController],
  providers: [
    EmployeeService,
    EmployeeRepository,
    EmployeeContactRepository,
    EmployeePasswordRepository,
    EmployeePermissionRepository,
    EmployeeMapper,
    EmployeeContactMapper,
    EmployeePermissionMapper,
    PrismaService,
    AuthService,
    JwtService,
  ],
  exports: [EmployeeService],
})
export class EmployeeModule {}
