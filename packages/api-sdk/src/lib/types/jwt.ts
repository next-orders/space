import { EmployeePermission } from './objects';

export type JWTEmployeeData = {
  id: string;
  permissions: EmployeePermission['type'][];
};

export type JWTEmployeeAccessTokenPayload = {
  /** This JWT ID */
  sub: string;
  /** Employee open data */
  user: JWTEmployeeData;
  /** Issued At */
  iat: number;
  /** Expiration At */
  exp: number;
};
