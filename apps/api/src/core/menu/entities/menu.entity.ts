import { createId } from '@paralleldrive/cuid2';
import { PrismaModels } from '../../../db/prisma.service';
import { Menu, MenuCategory } from '@next-orders/api-sdk';

export type ModelMenu = PrismaModels['Menu'];
type ModelMenuCategory = PrismaModels['MenuCategory'];

export class MenuEntity implements ModelMenu {
  id!: string;
  name!: string;
  createdAt!: Date;
  updatedAt!: Date;
  channelId!: string;

  constructor(data: Partial<MenuEntity>) {
    Object.assign(this, data);

    if (!data.id) {
      this.id = createId();
    }
  }

  public static toEntity(
    menu: ModelMenu,
    categories: ModelMenuCategory[],
  ): Menu {
    return {
      ...menu,
      categories: categories as MenuCategory[],
    };
  }
}
