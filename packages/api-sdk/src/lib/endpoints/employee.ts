import { z } from 'zod';
import {
  Employee,
  EmployeeContact,
  EmployeePermission,
  EmployeePermissionType,
} from '../types/objects';

const employeePermissionTypes: EmployeePermissionType[] = [
  'READ_CLIENTS',
  'EDIT_CLIENTS',
  'READ_MEDIA',
  'EDIT_MEDIA',
  'READ_CHANNELS',
  'EDIT_CHANNELS',
  'READ_PRODUCTS',
  'EDIT_PRODUCTS',
  'READ_MENUS',
  'EDIT_MENUS',
];

export const EmployeeCreateRequestSchema = z.object({
  firstName: z.string(),
});

export type EmployeeCreateRequest = z.infer<typeof EmployeeCreateRequestSchema>;
export type EmployeeCreateResponse = {
  ok: boolean;
  result: Employee;
};

// ---------------------------------------------------- //
export const EmployeeContactCreateRequestSchema = z.object({
  employeeId: z.string(),
  type: z.string(),
  value: z.string(),
  isUsedForAuthentication: z.boolean(),
});

export type EmployeeContactCreateRequest = z.infer<
  typeof EmployeeContactCreateRequestSchema
>;
export type EmployeeContactCreateResponse = {
  ok: boolean;
  result: EmployeeContact;
};

// ---------------------------------------------------- //
export const EmployeePasswordCreateRequestSchema = z.object({
  employeeId: z.string(),
  password: z.string(),
});

export type EmployeePasswordCreateRequest = z.infer<
  typeof EmployeePasswordCreateRequestSchema
>;
export type EmployeePasswordCreateResponse = {
  ok: boolean;
};

// ---------------------------------------------------- //
export const EmployeePermissionCreateRequestSchema = z.object({
  employeeId: z.string(),
  type: z.enum(employeePermissionTypes as [string, ...string[]]),
});

export type EmployeePermissionCreateRequest = z.infer<
  typeof EmployeePermissionCreateRequestSchema
>;
export type EmployeePermissionCreateResponse = {
  ok: boolean;
  result: EmployeePermission;
};

// ---------------------------------------------------- //
export const SignInByEmailRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type SignInByEmailRequest = z.infer<typeof SignInByEmailRequestSchema>;
export type SignInByEmailResponse = {
  ok: boolean;
  result: {
    access_token: string;
  };
};
