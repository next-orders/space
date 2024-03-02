import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@/db/prisma.service';
import { AuthService } from '@/core/auth/auth.service';
import { EmployeeController } from '@/core/employee/employee.controller';
import { EmployeeService } from '@/core/employee/employee.service';
import {
  EmployeeContactRepository,
  EmployeePasswordRepository,
  EmployeePermissionRepository,
  EmployeeRepository,
} from '@/core/employee/repositories';
import {
  EmployeeContactMapper,
  EmployeeMapper,
  EmployeePermissionMapper,
} from '@/core/employee/mappers';

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
