import { Module } from '@nestjs/common';
import { ChannelController } from './channel.controller';
import { ChannelService } from './channel.service';
import { ChannelRepository } from './channel.repository';
import { PrismaService } from '../../db/prisma.service';
import { ChannelMapper } from './channel.mapper';

@Module({
  controllers: [ChannelController],
  providers: [ChannelService, ChannelRepository, ChannelMapper, PrismaService],
})
export class ChannelModule {}
