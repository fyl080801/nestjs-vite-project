import { Request, Post, Controller, Get, Res } from '@nestjs/common';
import { AuthService } from '../service/auth';
import { Authentication } from '../decorators/authentication';
import { Jwt } from '../decorators/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthConfig } from '../types';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('login')
  @Authentication()
  async login(@Request() request: any) {
    return this.authService.login(request.user);
  }

  @Get('logout')
  logout(@Res({ passthrough: true }) response: Response) {
    const config = this.configService.get<AuthConfig>('auth', {});
    const cookitname = config.cookie?.name;
    response.clearCookie(cookitname);
  }

  @Get('profile')
  @Jwt()
  getProfile(@Request() request: any) {
    return request.user;
  }
}
