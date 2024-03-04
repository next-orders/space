import { Module } from '@nestjs/common';
import { PrismaService } from '../../db/prisma.service';
import { ProductVariantService } from '../product-variant/product-variant.service';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { MenuRepository } from './menu.repository';

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
