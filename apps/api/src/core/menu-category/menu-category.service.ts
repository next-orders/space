import { Injectable } from '@nestjs/common';
import { createId } from '@paralleldrive/cuid2';
import { MenuCategory } from '@next-orders/api-sdk';
import { PrismaService } from '@/db/prisma.service';
import {
  CreateMenuCategoryDto,
  UpdateMenuCategoryDto,
} from '@/core/menu-category/dto';

@Injectable()
export class MenuCategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async listMenuCategories(menuId: string): Promise<MenuCategory[]> {
    const list = await this.prisma.menuCategory.findMany({
      where: { menuId },
    });
    if (!list) {
      return [];
    }

    return list as MenuCategory[];
  }

  async findMenuCategoryById(id: string): Promise<MenuCategory | null> {
    const category = await this.prisma.menuCategory.findFirst({
      where: { id },
    });
    if (!category) {
      return null;
    }

    return category as MenuCategory;
  }

  async findMenuCategoryBySlug(slug: string): Promise<MenuCategory | null> {
    const category = await this.prisma.menuCategory.findFirst({
      where: { slug },
    });
    if (!category) {
      return null;
    }

    return category as MenuCategory;
  }

  async createCategory(
    dto: CreateMenuCategoryDto
  ): Promise<MenuCategory | null> {
    const category = await this.prisma.menuCategory.create({
      data: {
        id: createId(),
        menuId: dto.menuId,
        name: dto.name,
        slug: dto.slug,
      },
    });
    if (!category) {
      return null;
    }

    return category as MenuCategory;
  }

  async updateCategory(
    categoryId: string,
    dto: UpdateMenuCategoryDto
  ): Promise<MenuCategory | null> {
    // Exist?
    const category = await this.prisma.menuCategory.findFirst({
      where: { id: categoryId },
    });
    if (!category) {
      return null;
    }

    const updated = await this.prisma.menuCategory.update({
      where: { id: categoryId },
      data: {
        name: dto.name,
        slug: dto.slug,
        icon: dto.icon,
      },
    });
    if (!updated) {
      return null;
    }

    return updated as MenuCategory;
  }
}
