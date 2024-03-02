import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { AuthService } from '@/core/auth/auth.service';
import { Public } from '@/core/auth/auth.decorator';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly config: ConfigService,
    private readonly service: AuthService,
  ) {}

  @Public()
  @Get('verify/:token')
  async verifyToken(@Param('token') token: string) {
    const payload = await this.service.verifyToken(token);
    if (!payload) {
      throw new BadRequestException();
    }

    return payload;
  }

  @Public()
  @Get('employee/demo')
  async getDemoSignIn() {
    return {
      email: this.config.get<string>('DEMO_AUTH_EMAIL'),
      password: this.config.get<string>('DEMO_AUTH_PASS'),
    };
  }
}
