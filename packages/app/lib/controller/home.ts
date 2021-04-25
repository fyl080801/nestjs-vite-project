import { Controller } from '@nestjs/common';
import { View } from '@seed/vite_service';

@Controller()
export class HomeController {
  @View('app/index.html')
  async index(): Promise<unknown> {
    return {
      title: 'nestjs + vite',
    };
  }
}
