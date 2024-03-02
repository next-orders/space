import { createId } from '@paralleldrive/cuid2';
import { EmployeeContact, EmployeeContactType } from '@next-orders/api-sdk';

export class EmployeeContactEntity implements EmployeeContact {
  id!: string;
  type!: EmployeeContactType;
  employeeId!: string;
  value!: string;
  isUsedForAuthentication!: boolean;

  constructor(data: Partial<EmployeeContactEntity>) {
    Object.assign(this, data);

    if (!data.id) {
      this.id = createId();
    }
  }
}
