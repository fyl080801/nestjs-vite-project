import { Controller, Request } from '@nestjs/common';
import { View } from '@seed/view_service';
import { Authentication } from '@seed/passport';

@Controller()
export class HomeController {
  @View('app/index.html')
  @Authentication({ redirect: true })
  async index(@Request() request: any): Promise<unknown> {
    return {
      title: 'nestjs + vite',
      user: request.user,
    };
  }
}
