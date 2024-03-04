import { Injectable } from '@nestjs/common';
import { Menu, ProductVariant } from '@next-orders/api-sdk';
import { ProductVariantService } from '../product-variant/product-variant.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { MenuRepository } from './menu.repository';
import { MenuEntity } from './entities';

@Injectable()
export class MenuService {
  constructor(
    private readonly repository: MenuRepository,
    private readonly productVariant: ProductVariantService,
  ) {}

  async create(dto: CreateMenuDto): Promise<Menu> {
    const newMenuEntity = new MenuEntity({
      name: dto.name,
      channelId: dto.channelId,
    });

    return this.repository.create(newMenuEntity);
  }

  async findAllMenusInChannel(channelId: string): Promise<Menu[] | null> {
    const menus = await this.repository.findAllByChannelId(channelId);
    if (!menus) {
      return null;
    }

    return menus;
  }

  findMenuById(id: string): Promise<Menu | null> {
    return this.repository.findById(id);
  }

  async getTopSearchOnMenu(menuId: string): Promise<ProductVariant[] | null> {
    return this.productVariant.findPopularProductVariantsByMenuId(menuId);
  }

  async searchOnMenu(
    menuId: string,
    query: string,
  ): Promise<ProductVariant[] | null> {
    if (query.length < 2) {
      return null;
    }

    return this.productVariant.findProductVariantByNameAndMenuId(menuId, query);
  }
}
