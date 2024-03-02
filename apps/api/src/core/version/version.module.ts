import { Module } from '@nestjs/common';
import { VersionController } from '@/core/version/version.controller';

@Module({
  controllers: [VersionController],
})
export class VersionModule {}
