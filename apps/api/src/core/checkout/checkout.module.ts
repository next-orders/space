import { Module } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CheckoutController } from './checkout.controller';
import { PrismaService } from '../../db/prisma.service';
import { ProductVariantService } from '../product-variant/product-variant.service';

@Module({
  controllers: [CheckoutController],
  providers: [CheckoutService, ProductVariantService, PrismaService],
})
export class CheckoutModule {}
