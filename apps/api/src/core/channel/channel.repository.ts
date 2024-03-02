import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/db/prisma.service';
import { ChannelEntity } from '@/core/channel/entities';
import { ChannelMapper } from '@/core/channel/channel.mapper';

@Injectable()
export class ChannelRepository {
  constructor(
    private readonly mapper: ChannelMapper,
    private readonly prisma: PrismaService,
  ) {}

  async findAll(): Promise<ChannelEntity[]> {
    const channels = await this.prisma.channel.findMany();
    return channels.map(this.mapper.toEntity);
  }

  async findById(id: string): Promise<ChannelEntity | null> {
    const channel = await this.prisma.channel.findUnique({ where: { id } });
    return channel ? this.mapper.toEntity(channel) : null;
  }

  async create(data: ChannelEntity): Promise<ChannelEntity> {
    const channel = await this.prisma.channel.create({ data });
    return this.mapper.toEntity(channel);
  }
}
