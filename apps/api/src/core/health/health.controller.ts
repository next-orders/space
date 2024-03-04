import { Controller, Get } from '@nestjs/common';
import { Public } from '../auth/auth.decorator';

@Controller('health')
export class HealthController {
  @Public()
  @Get()
  getHealth() {
    return { ok: true };
  }
}
