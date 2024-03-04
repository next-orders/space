import { Module } from '@nestjs/common';
import { AvatarController } from './avatar.controller';

@Module({
  controllers: [AvatarController],
})
export class AvatarModule {}
