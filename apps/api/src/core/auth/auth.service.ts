import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { createId } from '@paralleldrive/cuid2';
import type {
  EmployeePermissionType,
  JWTEmployeeAccessTokenPayload,
  JWTEmployeeData,
} from '@next-orders/api-sdk';

@Injectable()
export class AuthService {
  constructor(
    private readonly config: ConfigService,
    private readonly jwt: JwtService
  ) {}

  async verifyToken(token: string) {
    try {
      const payload = await this.jwt.verifyAsync<JWTEmployeeAccessTokenPayload>(
        token,
        {
          secret: this.config.getOrThrow('JWT_SECRET'),
        }
      );
      if (!payload.user) {
        return null;
      }

      return payload;
    } catch (err) {
      return null;
    }
  }

  async createToken(
    userId: string,
    permissions: EmployeePermissionType[]
  ): Promise<string> {
    const sub = createId();
    const user: JWTEmployeeData = {
      id: userId,
      permissions,
    };

    const payload: Omit<JWTEmployeeAccessTokenPayload, 'iat' | 'exp'> = {
      sub,
      user,
    };

    return this.jwt.signAsync(payload, {
      secret: this.config.getOrThrow('JWT_SECRET'),
    });
  }
}
