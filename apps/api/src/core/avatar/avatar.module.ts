import { Module } from '@nestjs/common';
import { AvatarController } from '@/core/avatar/avatar.controller';

@Module({
  controllers: [AvatarController],
})
export class AvatarModule {}
