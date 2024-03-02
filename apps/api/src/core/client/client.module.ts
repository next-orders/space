import { Module } from '@nestjs/common';
import { PrismaService } from '@/db/prisma.service';
import { ClientController } from '@/core/client/client.controller';
import { ClientService } from '@/core/client/client.service';

@Module({
  controllers: [ClientController],
  providers: [ClientService, PrismaService],
})
export class ClientModule {}
