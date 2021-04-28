import { Module } from '@nestjs/common';
import { UserService } from './service/user';
import { AuthService } from './service/auth';
import { LocalStrategy } from './strategy/local';
import { CookieStrategy } from './strategy/cookie';
import { AuthController } from './controller/auth';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt';
import { UnauthorizedrRedirect } from './filter/unauthorized';
import { ConfigService } from '@nestjs/config';
import { AuthConfig } from './types';
import { jwtConstants } from './utils/constants';

export * from './decorators/authorization';
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
  ],
  controllers: [AuthController],
  providers: [
    UserService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    CookieStrategy,
    UnauthorizedrRedirect,
  ],
  exports: [JwtModule, UserService, AuthService, UnauthorizedrRedirect],
})
export class PassportModule {}

export { UnauthorizedrRedirect, AuthService };
