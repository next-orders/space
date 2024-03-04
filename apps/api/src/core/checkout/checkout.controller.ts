import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import {
  CheckoutAddOneToLineResponse,
  CheckoutChangeDeliveryMethodResponse,
  CheckoutCreateResponse,
  CheckoutRemoveOneFromLineResponse,
  ProductVariantAddToCheckoutResponse,
} from '@next-orders/api-sdk';
import { CheckoutService } from './checkout.service';
import { Public } from '../auth/auth.decorator';
import {
  AddProductDto,
  ChangeDeliveryMethodDto,
  CreateCheckoutDto,
} from './dto';

@Controller('checkout')
export class CheckoutController {
  constructor(private readonly service: CheckoutService) {}

  @Public()
  @Post(':id/method')
  async changeCheckoutDeliveryMethod(
    @Param('id') id: string,
    @Body() dto: ChangeDeliveryMethodDto,
  ): Promise<CheckoutChangeDeliveryMethodResponse> {
    const changed = await this.service.changeCheckoutDeliveryMethod(id, dto);
    if (!changed) {
      throw new BadRequestException();
    }

    return changed;
  }

  @Public()
  @Post(':id/add')
  async addProductToCheckout(
    @Param('id') id: string,
    @Body() dto: AddProductDto,
  ): Promise<ProductVariantAddToCheckoutResponse> {
    const added = await this.service.addProductToCheckout(id, dto);
    if (!added) {
      throw new BadRequestException();
    }

    return added;
  }

  @Public()
  @Post(':id/:lineId/add-one')
  async addOneToCheckoutLine(
    @Param('id') id: string,
    @Param('lineId') lineId: string,
  ): Promise<CheckoutAddOneToLineResponse> {
    const added = await this.service.addOneToCheckoutLine(id, lineId);
    if (!added) {
      throw new BadRequestException();
    }

    return added;
  }

  @Public()
  @Post(':id/:lineId/remove-one')
  async removeOneFromCheckoutLine(
    @Param('id') id: string,
    @Param('lineId') lineId: string,
  ): Promise<CheckoutRemoveOneFromLineResponse> {
    const removed = await this.service.removeOneFromCheckoutLine(id, lineId);
    if (!removed) {
      throw new BadRequestException();
    }

    return removed;
  }

  @Public()
  @Post()
  async createCheckout(
    @Body() dto: CreateCheckoutDto,
  ): Promise<CheckoutCreateResponse> {
    const created = await this.service.createCheckout(dto);
    if (!created) {
      throw new BadRequestException();
    }

    return created;
  }

  @Public()
  @Get(':id')
  findCheckoutById(@Param('id') id: string) {
    return this.service.findCheckoutById(id);
  }
}
