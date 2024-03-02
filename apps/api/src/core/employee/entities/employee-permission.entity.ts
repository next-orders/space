import { createId } from '@paralleldrive/cuid2';
import {
  EmployeePermission,
  EmployeePermissionType,
} from '@next-orders/api-sdk';

export class EmployeePermissionEntity implements EmployeePermission {
  id!: string;
  type!: EmployeePermissionType;
  employeeId!: string;

  constructor(data: Partial<EmployeePermissionEntity>) {
    Object.assign(this, data);

    if (!data.id) {
      this.id = createId();
    }
  }
}
