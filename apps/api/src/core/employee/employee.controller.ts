import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { EmployeeService } from '@/core/employee/employee.service';
import { Public } from '@/core/auth/auth.decorator';
import {
  Employee,
  EmployeeContactCreateResponse,
  EmployeeCreateResponse,
  EmployeePasswordCreateResponse,
  EmployeePermissionCreateResponse,
  SignInByEmailResponse,
} from '@next-orders/api-sdk';
import {
  CreateEmployeeContactDto,
  CreateEmployeeDto,
  CreateEmployeePasswordDto,
  CreateEmployeePermissionDto,
  SignInByEmailDto,
} from '@/core/employee/dto';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly service: EmployeeService) {}

  @Public()
  @Post()
  async create(
    @Body() dto: CreateEmployeeDto
  ): Promise<EmployeeCreateResponse> {
    const created = await this.service.create(dto);
    if (!created) {
      throw new BadRequestException();
    }

    return {
      ok: true,
      result: created,
    };
  }

  @Public()
  @Post('contact')
  async createContact(
    @Body() dto: CreateEmployeeContactDto
  ): Promise<EmployeeContactCreateResponse> {
    const created = await this.service.createContact(dto);
    if (!created) {
      throw new BadRequestException();
    }

    return {
      ok: true,
      result: created,
    };
  }

  @Public()
  @Post('password')
  async createPassword(
    @Body() dto: CreateEmployeePasswordDto
  ): Promise<EmployeePasswordCreateResponse> {
    const created = await this.service.createPassword(dto);
    if (!created) {
      throw new BadRequestException();
    }

    return {
      ok: true,
    };
  }

  @Public()
  @Post('permission')
  async createPermission(
    @Body() dto: CreateEmployeePermissionDto
  ): Promise<EmployeePermissionCreateResponse> {
    const created = await this.service.createPermission(dto);
    if (!created) {
      throw new BadRequestException();
    }

    return {
      ok: true,
      result: created,
    };
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('email')
  async signInByEmail(
    @Body() dto: SignInByEmailDto
  ): Promise<SignInByEmailResponse> {
    const jwt = await this.service.signInByEmail(dto);
    if (!jwt) {
      throw new UnauthorizedException();
    }

    return jwt;
  }

  @Public()
  @Get(':id')
  async findById(@Param('id') id: string): Promise<Employee> {
    const employee = await this.service.findById(id);
    if (!employee) {
      throw new NotFoundException();
    }

    return employee;
  }
}
