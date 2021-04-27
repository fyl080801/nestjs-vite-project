import { Controller, UseGuards } from '@nestjs/common';
import { View } from '@seed/vite_service';
import { LocalAuthGuard } from '@seed/passport';

@Controller()
export class HomeController {
  @UseGuards(LocalAuthGuard)
  @View('app/index.html')
  async index(): Promise<unknown> {
    return {
      title: 'nestjs + vite',
    };
  }
}
