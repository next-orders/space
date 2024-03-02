import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { ProductVariantService } from '@/core/product-variant/product-variant.service';
import { Permissions, Public } from '@/core/auth/auth.decorator';
import { CreateProductVariantDto } from '@/core/product-variant/dto/create-product-variant.dto';

@Controller('product-variant')
export class ProductVariantController {
  constructor(private readonly service: ProductVariantService) {}

  @Public()
  @Get('category/:id')
  findProductVariantsInCategory(@Param('id') id: string) {
    return this.service.findProductVariantsInCategory(id);
  }

  @Public()
  @Get('slug/:slug')
  async findProductVariantBySlug(@Param('slug') slug: string) {
    const product = await this.service.findProductVariantBySlug(slug);
    if (!product) {
      throw new NotFoundException();
    }

    return product;
  }

  @Permissions(['EDIT_PRODUCTS'])
  @Post()
  async createProductVariant(@Body() dto: CreateProductVariantDto) {
    const product = await this.service.createProductVariant(dto);
    if (!product) {
      throw new BadRequestException();
    }

    return product;
  }

  @Permissions(['EDIT_PRODUCTS'])
  @Post(':id/media/:mediaId')
  async addMediaToProductVariant(
    @Param('id') id: string,
    @Param('mediaId') mediaId: string,
  ) {
    const added = await this.service.addMediaToProductVariant(id, mediaId);
    if (!added) {
      throw new BadRequestException();
    }

    return added;
  }

  @Public()
  @Get(':id')
  async findProductVariantById(@Param('id') id: string) {
    const product = await this.service.findProductVariantById(id);
    if (!product) {
      throw new NotFoundException();
    }

    return product;
  }
}
