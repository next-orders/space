import { createId } from '@paralleldrive/cuid2';
import { EmployeePassword } from '@next-orders/api-sdk';

export class EmployeePasswordEntity implements EmployeePassword {
  id!: string;
  hash!: string;
  createdAt!: Date;
  updatedAt!: Date;
  employeeId!: string;

  constructor(data: Partial<EmployeePasswordEntity>) {
    Object.assign(this, data);

    if (!data.id) {
      this.id = createId();
    }
  }
}
