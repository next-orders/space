import { createId } from '@paralleldrive/cuid2';
import { Employee } from '@next-orders/api-sdk';

export class EmployeeEntity implements Employee {
  id!: string;
  firstName!: string;
  lastName!: string | null;
  isActive!: boolean;
  createdAt!: Date;
  updatedAt!: Date;
  lastLogin!: Date | null;

  constructor(data: Partial<EmployeeEntity>) {
    Object.assign(this, data);

    if (!data.id) {
      this.id = createId();
    }
  }
}
