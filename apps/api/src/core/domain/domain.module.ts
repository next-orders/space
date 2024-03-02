import { Module } from '@nestjs/common';
import { PrismaService } from '@/db/prisma.service';
import { DomainController } from '@/core/domain/domain.controller';
import { DomainService } from '@/core/domain/domain.service';

@Module({
  controllers: [DomainController],
  providers: [DomainService, PrismaService],
})
export class DomainModule {}
