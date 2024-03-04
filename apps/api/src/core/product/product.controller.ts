import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Permissions, Public } from '../auth/auth.decorator';

@Controller('product')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @Public()
  @Get('list')
  async findProducts() {
    const products = await this.service.findProducts();
    if (!products) {
      throw new NotFoundException();
    }

    return products;
  }

  @Permissions(['EDIT_PRODUCTS'])
  @Post()
  async createProduct(@Body() dto: CreateProductDto) {
    const product = await this.service.createProduct(dto);
    if (!product) {
      throw new BadRequestException();
    }

    return product;
  }

  @Public()
  @Get(':id')
  async findProductById(@Param('id') id: string) {
    const product = await this.service.findProductById(id);
    if (!product) {
      throw new NotFoundException();
    }

    return product;
  }
}
