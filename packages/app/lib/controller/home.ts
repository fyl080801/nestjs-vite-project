import { Controller, Request } from '@nestjs/common';
import { View } from '@seed/vite_service';
import { Authorization } from '@seed/passport';

@Controller()
export class HomeController {
  @View('app/index.html')
  @Authorization({ redirect: true })
  async index(@Request() request: any): Promise<unknown> {
    return {
      title: 'nestjs + vite',
      user: request.user,
    };
  }
}
