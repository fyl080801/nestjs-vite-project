import { Controller, Request } from '@nestjs/common';
import { View } from '@nestseed/view_service';
// import { Authentication } from '@nestseed/passport';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '../types';
import { UserService } from '@nestseed/membership';

@Controller()
export class HomeController {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}

  // @View('*', 'app/index.html')
  // @Authentication({ redirect: true })
  async index(@Request() request: any) {
    const config = this.configService.get<AppConfig>('app', { title: '' });
    const user = await this.userService.getById(request.user.id);
    return {
      title: config.title,
      user: JSON.stringify({
        id: user.id,
        username: user.username,
        roles: user.roles.map((r) => r.rolename),
      }),
    };
  }
}
