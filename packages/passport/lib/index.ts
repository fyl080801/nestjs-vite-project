import { Module } from '@nestjs/common';
import { AuthService } from './service/auth';
import { MembershipModule } from '@nestseed/membership';
import { LocalStrategy, CookieStrategy, JwtStrategy } from './strategy';
import { AuthController } from './controller/auth';
import { JwtModule } from '@nestjs/jwt';
import { UnauthorizedRedirect } from './filter/unauthorized';
import { ConfigService } from '@nestjs/config';
import { AuthConfig } from './types';
import { jwtConstants } from './utils/constants';

export * from './decorators/authentication';
export * from './types';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const authConfig = configService.get<AuthConfig>('auth', {});
        return {
          secret: authConfig.jwt?.secret || jwtConstants.secret,
          signOptions: {
            expiresIn: authConfig.jwt?.expiresIn || jwtConstants.expiresIn,
          },
        };
      },
    }),
    MembershipModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    CookieStrategy,
    UnauthorizedRedirect,
  ],
  exports: [JwtModule, AuthService, UnauthorizedRedirect],
})
export class PassportModule {}

export { UnauthorizedRedirect, AuthService };
