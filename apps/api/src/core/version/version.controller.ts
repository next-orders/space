import { Controller, Get } from '@nestjs/common';
import { Public } from '../auth/auth.decorator';

@Controller('version')
export class VersionController {
  @Public()
  @Get()
  getVersion() {
    return {
      ok: true,
      version: '0.1.5',
    };
  }
}
