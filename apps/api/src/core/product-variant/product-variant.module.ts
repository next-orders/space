import { Module } from '@nestjs/common';
import { PrismaService } from '@/db/prisma.service';
import { ProductVariantController } from '@/core/product-variant/product-variant.controller';
import { ProductVariantService } from '@/core/product-variant/product-variant.service';

@Module({
  controllers: [ProductVariantController],
  providers: [ProductVariantService, PrismaService],
  exports: [ProductVariantService],
})
export class ProductVariantModule {}
