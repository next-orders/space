import { Module } from '@nestjs/common';
import { AuthController } from '@/core/auth/auth.controller';
import { AuthService } from '@/core/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtService],
  exports: [AuthService],
})
export class AuthModule {}
