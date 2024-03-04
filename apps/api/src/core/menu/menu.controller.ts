import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { Permissions, Public } from '../auth/auth.decorator';
import { CreateMenuDto } from './dto/create-menu.dto';
import { MenuCreateResponse } from '@next-orders/api-sdk';

@Controller('menu')
export class MenuController {
  constructor(private readonly service: MenuService) {}

  @Permissions(['EDIT_MENUS'])
  @Post()
  async create(@Body() dto: CreateMenuDto): Promise<MenuCreateResponse> {
    const menu = await this.service.create(dto);
    if (!menu) {
      throw new BadRequestException();
    }

    return {
      ok: true,
      result: menu,
    };
  }

  @Public()
  @Get('list/:channelId')
  async findAllMenusInChannel(@Param('channelId') channelId: string) {
    const menus = await this.service.findAllMenusInChannel(channelId);
    if (!menus) {
      throw new NotFoundException();
    }

    return menus;
  }

  @Public()
  @Get(':id')
  async findMenuById(@Param('id') id: string) {
    const menu = await this.service.findMenuById(id);
    if (!menu) {
      throw new NotFoundException();
    }

    return menu;
  }

  @Public()
  @Get(':id/search')
  async getTopSearchOnMenu(@Param('id') id: string) {
    const top = await this.service.getTopSearchOnMenu(id);
    if (!top) {
      throw new NotFoundException();
    }

    return top;
  }

  @Public()
  @Get(':id/search/:query')
  async searchOnMenu(@Param('id') id: string, @Param('query') query: string) {
    const found = await this.service.searchOnMenu(id, query);
    if (!found) {
      throw new NotFoundException();
    }

    return found;
  }
}
