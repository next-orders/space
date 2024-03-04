import { Injectable } from '@nestjs/common';
import { Menu } from '@next-orders/api-sdk';
import { PrismaService } from '../../db/prisma.service';
import { MenuEntity } from './entities';

@Injectable()
export class MenuRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: MenuEntity): Promise<Menu> {
    const created = await this.prisma.menu.create({
      data,
      include: {
        categories: true,
      },
    });
    return MenuEntity.toEntity(created, created.categories);
  }

  async findAllByChannelId(channelId: string): Promise<Menu[]> {
    const menus = await this.prisma.menu.findMany({
      where: { channelId },
      include: {
        categories: true,
      },
    });
    return menus.map((menu) => MenuEntity.toEntity(menu, menu.categories));
  }

  async findById(id: string): Promise<Menu | null> {
    const menu = await this.prisma.menu.findUnique({
      where: { id },
      include: {
        categories: true,
      },
    });
    return menu ? MenuEntity.toEntity(menu, menu.categories) : null;
  }
}
