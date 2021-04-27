import { Module } from '@nestjs/common';
import { UserService } from './service/user';
import { AuthService } from './service/auth';
import { LocalStrategy } from './strategy/local';
import { LocalAuthGuard } from './guard/local';
import { AuthController } from './controller/auth';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './utils/constants';
import { JwtStrategy } from './strategy/jwt';
import { JwtAuthGuard } from './guard/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1800s' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    UserService,
    AuthService,
    LocalStrategy,
    LocalAuthGuard,
    JwtAuthGuard,
    JwtStrategy,
  ],
  exports: [UserService, AuthService, LocalAuthGuard, JwtModule, JwtAuthGuard],
})
export class PassportModule {}

export { LocalAuthGuard };
