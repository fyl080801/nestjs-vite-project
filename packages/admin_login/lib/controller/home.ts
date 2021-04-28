import { Controller, Post, Request } from '@nestjs/common';
import { View } from '@seed/vite_service';
import { Authorization, AuthService } from '@seed/passport';

@Controller('admin')
export class HomeController {
  constructor(private authService: AuthService) {}

  @View('login', 'admin_login/index.html')
  async index() {
    return {
      title: 'Admin Login',
    };
  }

  @View('login/error', 'admin_login/index.html')
  async error() {
    return {
      title: 'Login Error',
    };
  }

  @Post('login')
  @Authorization({ redirect: '/admin/login/error' })
  async login(@Request() request: any) {
    return this.authService.login(request.user);
  }
}
