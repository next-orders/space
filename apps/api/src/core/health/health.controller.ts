import { Controller, Get } from '@nestjs/common';
import { Public } from '@/core/auth/auth.decorator';

@Controller('health')
export class HealthController {
  @Public()
  @Get()
  getHealth() {
    return { ok: true };
  }
}
