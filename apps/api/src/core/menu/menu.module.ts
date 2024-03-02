import { Module } from '@nestjs/common';
import { PrismaService } from '@/db/prisma.service';
import { ProductVariantService } from '@/core/product-variant/product-variant.service';
import { MenuController } from '@/core/menu/menu.controller';
import { MenuService } from '@/core/menu/menu.service';
import { MenuRepository } from '@/core/menu/menu.repository';

@Module({
  controllers: [MenuController],
  providers: [
    MenuService,
    MenuRepository,
    PrismaService,
    ProductVariantService,
  ],
})
export class MenuModule {}
