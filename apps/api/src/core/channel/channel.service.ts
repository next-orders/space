import { Injectable } from '@nestjs/common';
import type {
  Channel,
  CountryCode,
  CurrencyCode,
  LanguageCode,
} from '@next-orders/api-sdk';
import { CreateChannelDto } from './dto/create-channel.dto';
import { ChannelRepository } from './channel.repository';
import { ChannelEntity } from './entities';

@Injectable()
export class ChannelService {
  constructor(private readonly repository: ChannelRepository) {}

  findAllChannels(): Promise<Channel[]> {
    return this.repository.findAll();
  }

  findChannelById(id: string): Promise<Channel | null> {
    return this.repository.findById(id);
  }

  async createChannel(dto: CreateChannelDto): Promise<Channel> {
    const channelEntity = new ChannelEntity({
      slug: dto.slug,
      name: dto.name,
      description: dto.description ?? null,
      currencyCode: dto.currencyCode as CurrencyCode,
      languageCode: dto.languageCode as LanguageCode,
      countryCode: dto.countryCode as CountryCode,
    });

    return this.repository.create(channelEntity);
  }
}
