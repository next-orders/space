import { Module } from '@nestjs/common';
import { ChannelController } from '@/core/channel/channel.controller';
import { ChannelService } from '@/core/channel/channel.service';
import { ChannelRepository } from '@/core/channel/channel.repository';
import { PrismaService } from '@/db/prisma.service';
import { ChannelMapper } from '@/core/channel/channel.mapper';

@Module({
  controllers: [ChannelController],
  providers: [ChannelService, ChannelRepository, ChannelMapper, PrismaService],
})
export class ChannelModule {}
