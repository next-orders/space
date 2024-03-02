import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { ShopService } from '@/core/shop/shop.service';
import { Public } from '@/core/auth/auth.decorator';
import { CreateShopDto } from '@/core/shop/dto/create-shop.dto';

@Controller('shop')
export class ShopController {
  constructor(private readonly service: ShopService) {}

  @Public()
  @Get()
  async getShopData() {
    /** Shop can be only one in DB */
    const shop = await this.service.getShopData();
    if (!shop) {
      throw new NotFoundException();
    }

    return shop;
  }

  @Public()
  @Post()
  async createShop(@Body() dto: CreateShopDto) {
    const created = await this.service.createShop(dto);
    if (!created) {
      throw new BadRequestException();
    }

    return created;
  }
}
