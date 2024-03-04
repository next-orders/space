import { Injectable } from '@nestjs/common';
import { ChannelEntity } from './entities';
import { CountryCode, CurrencyCode, LanguageCode } from '@next-orders/api-sdk';
import { PrismaModels } from '../../db/prisma.service';

export type ModelChannel = PrismaModels['Channel'];

@Injectable()
export class ChannelMapper {
  toEntity(channel: ModelChannel): ChannelEntity {
    return {
      ...channel,
      currencyCode: channel.currencyCode as CurrencyCode,
      languageCode: channel.languageCode as LanguageCode,
      countryCode: channel.countryCode as CountryCode,
    };
  }
}
