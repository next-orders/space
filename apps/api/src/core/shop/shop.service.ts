import { Injectable } from '@nestjs/common';
import { createId } from '@paralleldrive/cuid2';
import { PrismaService } from '../../db/prisma.service';
import type { Shop } from '@next-orders/api-sdk';
import { CreateShopDto } from './dto/create-shop.dto';

@Injectable()
export class ShopService {
  constructor(private readonly prisma: PrismaService) {}

  async getShopData(): Promise<Shop | null> {
    const shop = await this.prisma.shop.findFirst();
    if (!shop) {
      return null;
    }

    return shop;
  }

  async createShop(dto: CreateShopDto): Promise<Shop | null> {
    // Check if already in DB
    const alreadyInDb = await this.prisma.shop.findFirst();
    if (alreadyInDb) {
      return null;
    }

    return this.prisma.shop.create({
      data: {
        id: createId(),
        name: dto.name,
        description: dto.description,
      },
    });
  }
}
