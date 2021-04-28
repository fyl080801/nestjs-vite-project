import { Controller } from '@nestjs/common';
import { View } from '@seed/vite_service';
import { Authorization } from '@seed/passport';

@Controller()
export class HomeController {
  @View('app/index.html')
  @Authorization({ redirect: true })
  async index(): Promise<unknown> {
    return {
      title: 'nestjs + vite',
    };
  }
}
