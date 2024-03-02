import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ZodValidationPipe } from 'nestjs-zod';
import { ProductModule } from '@/core/product/product.module';
import { CheckoutModule } from '@/core/checkout/checkout.module';
import { MenuModule } from '@/core/menu/menu.module';
import { MenuCategoryModule } from '@/core/menu-category/menu-category.module';
import { ShopModule } from '@/core/shop/shop.module';
import { ChannelModule } from '@/core/channel/channel.module';
import { ProductVariantModule } from '@/core/product-variant/product-variant.module';
import { MediaModule } from '@/core/media/media.module';
import { DomainModule } from '@/core/domain/domain.module';
import { AvatarModule } from '@/core/avatar/avatar.module';
import { ClientModule } from '@/core/client/client.module';
import { EmployeeModule } from '@/core/employee/employee.module';
import { AuthModule } from '@/core/auth/auth.module';
import { AuthGuard } from '@/core/auth/auth.guard';
import { HealthModule } from '@/core/health/health.module';
import { VersionModule } from '@/core/version/version.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => {
        return {
          global: true,
          secret: config.getOrThrow<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: config.getOrThrow<string | number>(
              'JWT_EXPIRATION_TIME'
            ),
          },
        };
      },
      inject: [ConfigService],
    }),
    HealthModule,
    VersionModule,
    ShopModule,
    ChannelModule,
    MediaModule,
    DomainModule,
    ClientModule,
    EmployeeModule,
    AuthModule,
    ProductModule,
    ProductVariantModule,
    CheckoutModule,
    MenuModule,
    MenuCategoryModule,
    AvatarModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
