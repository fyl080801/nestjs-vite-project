import { Request, Post, Controller, Get } from '@nestjs/common';
import { AuthService } from '../service/auth';
import { Authorization } from '../decorators/authorization';
import { Jwt } from '../decorators/jwt';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Authorization()
  async login(@Request() request: any) {
    return this.authService.login(request.user);
  }

  @Get('profile')
  @Jwt()
  getProfile(@Request() request: any) {
    return request.user;
  }
}
