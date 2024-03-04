import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { Permissions, Public } from '../auth/auth.decorator';
import { ChannelService } from './channel.service';
import { CreateChannelDto } from './dto/create-channel.dto';
import { Channel, ChannelCreateResponse } from '@next-orders/api-sdk';

@Controller('channel')
export class ChannelController {
  constructor(private readonly service: ChannelService) {}

  @Public()
  @Get('list')
  findAllChannels(): Promise<Channel[]> {
    return this.service.findAllChannels();
  }

  @Public()
  @Get(':id')
  async findChannelById(@Param('id') id: string): Promise<Channel> {
    const channel = await this.service.findChannelById(id);
    if (!channel) {
      throw new NotFoundException();
    }

    return channel;
  }

  @Permissions(['EDIT_CHANNELS'])
  @Post()
  async createChannel(
    @Body() dto: CreateChannelDto,
  ): Promise<ChannelCreateResponse> {
    const created = await this.service.createChannel(dto);
    if (!created) {
      throw new BadRequestException();
    }

    return {
      ok: true,
      result: created,
    };
  }
}
