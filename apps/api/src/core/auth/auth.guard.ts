import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';
import type {
  EmployeePermissionType,
  JWTEmployeeAccessTokenPayload,
} from '@next-orders/api-sdk';
import { IS_PUBLIC_KEY, Permissions } from '@/core/auth/auth.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly config: ConfigService,
    private readonly jwt: JwtService,
    private readonly reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return this.processPublicDecorator(isPublic);
    }

    const permissions = this.reflector.get(Permissions, context.getHandler());
    const isPermissions = permissions?.length > 0;
    if (isPermissions) {
      return this.processPermissionsDecorator(context, permissions);
    }

    return true;
  }

  /** If endpoint have @Public decorator */
  private processPublicDecorator(isPublic: boolean): boolean {
    return isPublic;
  }

  /** If endpoint have @Permissions decorator */
  private async processPermissionsDecorator(
    context: ExecutionContext,
    requiredPermissions: EmployeePermissionType[]
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new HttpException(
        'You have no access token',
        HttpStatus.UNAUTHORIZED
      );
    }

    const payload = await this.extractPayloadFromToken(token);
    if (!payload) {
      throw new HttpException(
        'Payload in token is not correct',
        HttpStatus.FORBIDDEN
      );
    }

    // All required permissions must be in token payload
    for (const p of requiredPermissions) {
      if (!payload.user.permissions.includes(p)) {
        throw new HttpException(
          `You have no required permission: ${p}`,
          HttpStatus.FORBIDDEN
        );
      }
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private async extractPayloadFromToken(
    token: string
  ): Promise<JWTEmployeeAccessTokenPayload | null> {
    try {
      return this.jwt.verifyAsync<JWTEmployeeAccessTokenPayload>(token, {
        secret: this.config.getOrThrow('JWT_SECRET'),
      });
    } catch (err) {
      // Some problem
      return null;
    }
  }
}
