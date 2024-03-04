import { Injectable } from '@nestjs/common';
import { createId } from '@paralleldrive/cuid2';
import { PrismaService } from '../../db/prisma.service';
import { ProductVariant } from '@next-orders/api-sdk';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';

@Injectable()
export class ProductVariantService {
  constructor(private readonly prisma: PrismaService) {}

  async findProductVariantsInCategory(
    categoryId: string,
  ): Promise<ProductVariant[] | null> {
    const products = await this.prisma.productVariant.findMany({
      where: { categoryId },
      include: {
        category: true,
        media: {
          include: {
            media: true,
          },
        },
      },
    });
    if (!products) {
      return null;
    }

    return products as ProductVariant[];
  }

  async findProductVariantBySlug(slug: string): Promise<ProductVariant | null> {
    const product = await this.prisma.productVariant.findFirst({
      where: { slug },
      include: {
        category: true,
        media: {
          include: {
            media: true,
          },
        },
      },
    });
    if (!product) {
      return null;
    }

    return product as ProductVariant;
  }

  async findProductVariantByNameAndMenuId(
    menuId: string,
    name: string,
  ): Promise<ProductVariant[] | null> {
    const product = await this.prisma.productVariant.findMany({
      where: {
        menuId,
        name: {
          mode: 'insensitive',
          contains: name,
        },
      },
      include: {
        category: true,
        media: {
          include: {
            media: true,
          },
        },
      },
    });
    if (!product) {
      return null;
    }

    return product as ProductVariant[];
  }

  async findPopularProductVariantsByMenuId(
    menuId: string,
  ): Promise<ProductVariant[] | null> {
    const products = await this.prisma.productVariant.findMany({
      where: { menuId },
      take: 5,
      include: {
        category: true,
        media: {
          include: {
            media: true,
          },
        },
      },
    });
    if (!products) {
      return null;
    }

    return products as ProductVariant[];
  }

  async findProductVariantById(id: string): Promise<ProductVariant | null> {
    const product = await this.prisma.productVariant.findUnique({
      where: { id },
      include: {
        category: true,
        media: {
          include: {
            media: true,
          },
        },
      },
    });
    if (!product) {
      return null;
    }

    return product as ProductVariant;
  }

  async createProductVariant(
    dto: CreateProductVariantDto,
  ): Promise<ProductVariant | null> {
    const product = await this.prisma.productVariant.create({
      data: {
        id: createId(),
        menuId: dto.menuId,
        productId: dto.productId,
        categoryId: dto.categoryId,
        name: dto.name,
        description: dto.description,
        slug: dto.slug,
        weightUnit: dto.weightUnit,
        weightValue: dto.weightValue,
        gross: dto.gross,
        net: dto.net,
        tax: dto.tax,
        seoTitle: dto.name,
        seoDescription: dto.description,
      },
      include: {
        category: true,
        media: {
          include: {
            media: true,
          },
        },
      },
    });

    if (!product) {
      return null;
    }

    return product as ProductVariant;
  }

  async addMediaToProductVariant(productVariantId: string, mediaId: string) {
    const added = await this.prisma.productMedia.create({
      data: {
        id: createId(),
        productVariantId,
        mediaId,
      },
    });

    if (!added) {
      return null;
    }

    return added;
  }
}
