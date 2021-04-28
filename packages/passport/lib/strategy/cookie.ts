import { Strategy } from 'passport-cookie';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthConfig } from '../types';
import { UserService } from '../service/user';

@Injectable()
export class CookieStrategy extends PassportStrategy(Strategy, 'cookie') {
  constructor(
    private readonly jwt: JwtService,
    private readonly userService: UserService,
    configService: ConfigService,
  ) {
    super({
      cookieName: configService.get<AuthConfig>('auth', {}).cookie?.name,
    });
  }

  async validate(token: string): Promise<any> {
    const decoded = this.jwt.decode(token);
    const verified = await this.userService.verify(decoded);

    if (!verified) {
      throw new UnauthorizedException();
    }

    return decoded;
  }
}
