import { Module } from '@nestjs/common';
import { PrismaService } from '../../db/prisma.service';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { S3Service } from '../../s3/s3.service';

@Module({
  controllers: [MediaController],
  providers: [MediaService, PrismaService, S3Service],
})
export class MediaModule {}
