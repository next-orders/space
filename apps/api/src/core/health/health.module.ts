import { Module } from '@nestjs/common';
import { HealthController } from '@/core/health/health.controller';

@Module({
  controllers: [HealthController],
})
export class HealthModule {}
