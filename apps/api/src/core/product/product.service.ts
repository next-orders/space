import { Injectable } from '@nestjs/common';
import { createId } from '@paralleldrive/cuid2';
import { PrismaService } from '@/db/prisma.service';
import { Product } from '@next-orders/api-sdk';
import { CreateProductDto } from '@/core/product/dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async findProductById(id: string): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        variants: {
          include: {
            category: true,
            media: {
              include: {
                media: true,
              },
            },
          },
        },
      },
    });
    if (!product) {
      return null;
    }

    return product as Product;
  }

  async findProducts(): Promise<Product[] | null> {
    const products = await this.prisma.product.findMany({
      include: {
        variants: {
          include: {
            category: true,
            media: {
              include: {
                media: true,
              },
            },
          },
        },
      },
    });
    if (!products) {
      return null;
    }

    return products as Product[];
  }

  async createProduct(dto: CreateProductDto): Promise<Product | null> {
    const product = await this.prisma.product.create({
      data: {
        id: createId(),
        type: dto.type,
        name: dto.name,
        description: dto.description,
      },
      include: {
        variants: {
          include: {
            category: true,
            media: {
              include: {
                media: true,
              },
            },
          },
        },
      },
    });

    if (!product) {
      return null;
    }

    return product as Product;
  }
}
