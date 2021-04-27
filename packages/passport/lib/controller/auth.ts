import { UseGuards, Request, Post, Controller, Get } from '@nestjs/common';
import { LocalAuthGuard } from '../guard/local';
import { JwtAuthGuard } from '../guard/jwt';
import { AuthService } from '../service/auth';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() request: any) {
    return this.authService.login(request.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() request: any) {
    return request.user;
  }
}
