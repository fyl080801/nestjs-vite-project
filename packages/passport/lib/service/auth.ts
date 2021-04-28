import { Injectable } from '@nestjs/common';
import { UserService } from './user';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthConfig } from '../types';
import { jwtConstants } from '../utils/constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user && user.password === pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, id: user.id };
    const authConfig = this.configService.get<AuthConfig>('auth', {});

    const { expiresIn = jwtConstants.expiresIn, secret = jwtConstants.secret } =
      authConfig.jwt || {};

    return {
      access_token: this.jwtService.sign(payload, {
        expiresIn,
        secret,
      }),
      expiresIn,
    };
  }
}
