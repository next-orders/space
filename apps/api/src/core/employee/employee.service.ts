import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import type {
  Employee,
  EmployeeContact,
  EmployeeContactType,
  EmployeePassword,
  EmployeePermission,
  EmployeePermissionType,
} from '@next-orders/api-sdk';
import {
  CreateEmployeeContactDto,
  CreateEmployeeDto,
  CreateEmployeePasswordDto,
  CreateEmployeePermissionDto,
  SignInByEmailDto,
} from './dto';
import { AuthService } from '../auth/auth.service';
import {
  EmployeeContactRepository,
  EmployeePasswordRepository,
  EmployeePermissionRepository,
  EmployeeRepository,
} from './repositories';
import {
  EmployeeContactEntity,
  EmployeeEntity,
  EmployeePasswordEntity,
  EmployeePermissionEntity,
} from './entities';

@Injectable()
export class EmployeeService {
  constructor(
    private readonly repository: EmployeeRepository,
    private readonly contactRepository: EmployeeContactRepository,
    private readonly passwordRepository: EmployeePasswordRepository,
    private readonly permissionRepository: EmployeePermissionRepository,
    private readonly auth: AuthService,
  ) {}

  async create(dto: CreateEmployeeDto): Promise<Employee> {
    const employeeEntity = new EmployeeEntity({
      firstName: dto.firstName,
    });

    return this.repository.create(employeeEntity);
  }

  async createContact(dto: CreateEmployeeContactDto): Promise<EmployeeContact> {
    const employeeContactEntity = new EmployeeContactEntity({
      employeeId: dto.employeeId,
      value: dto.value,
      type: dto.type as EmployeeContactType,
      isUsedForAuthentication: dto.isUsedForAuthentication,
    });

    return this.contactRepository.create(employeeContactEntity);
  }

  async createPassword(
    dto: CreateEmployeePasswordDto,
  ): Promise<EmployeePassword> {
    const hashedPassword = await hash(dto.password, 10);
    const employeePasswordEntity = new EmployeePasswordEntity({
      hash: hashedPassword,
      employeeId: dto.employeeId,
    });

    return this.passwordRepository.create(employeePasswordEntity);
  }

  async createPermission(
    dto: CreateEmployeePermissionDto,
  ): Promise<EmployeePermission> {
    const employeePermissionEntity = new EmployeePermissionEntity({
      employeeId: dto.employeeId,
      type: dto.type as EmployeePermissionType,
    });

    return this.permissionRepository.create(employeePermissionEntity);
  }

  findById(id: string): Promise<Employee | null> {
    return this.repository.findById(id);
  }

  async findEmployeeByContact(
    contactValue: string,
    type: EmployeeContactType,
  ): Promise<Employee | null> {
    const employeeContact = await this.contactRepository.findByValueAndType(
      contactValue,
      type,
    );
    if (!employeeContact) {
      return null;
    }

    return this.repository.findById(employeeContact.employeeId);
  }

  async checkPassword(employeeId: string, password: string): Promise<boolean> {
    const passwords =
      await this.passwordRepository.findAllWithEmployeeId(employeeId);
    if (!passwords || !passwords.length) {
      return false;
    }

    for (const p of passwords) {
      // Check Hash
      const match = await compare(password, p.hash);
      if (match) {
        return true; // This Password is valid!
      }
    }

    // No similar Passwords
    return false;
  }

  async signInByEmail(dto: SignInByEmailDto) {
    const employee = await this.findEmployeeByContact(dto.email, 'EMAIL');
    if (!employee) {
      return null;
    }

    const isPasswordValid = await this.checkPassword(employee.id, dto.password);
    if (!isPasswordValid) {
      return null;
    }

    const permissions = await this.permissionRepository.findAllWithEmployeeId(
      employee.id,
    );
    const permissionTypes: EmployeePermissionType[] = permissions.map(
      (p) => p.type,
    );

    const accessToken = await this.auth.createToken(
      employee.id,
      permissionTypes,
    );

    return {
      ok: true,
      result: {
        access_token: accessToken,
      },
    };
  }
}
