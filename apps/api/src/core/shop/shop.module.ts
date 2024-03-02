import { Module } from '@nestjs/common';
import { PrismaService } from '@/db/prisma.service';
import { ShopController } from '@/core/shop/shop.controller';
import { ShopService } from '@/core/shop/shop.service';

@Module({
  controllers: [ShopController],
  providers: [ShopService, PrismaService],
})
export class ShopModule {}
