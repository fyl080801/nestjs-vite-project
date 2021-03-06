import { Controller, Post, Request } from '@nestjs/common';
import { View } from '@nestseed/view_service';
import { Authenticated, Authentication, AuthService } from '@nestseed/passport';

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
  @Authentication({ redirect: '/admin/login/error' })
  @Authenticated()
  async login(@Request() request: any) {
    return this.authService.login(request.user);
  }
}
