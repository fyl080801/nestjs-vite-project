import { Controller, UseFilters, UseGuards } from '@nestjs/common';
import { View } from '@seed/vite_service';
import { LocalAuthGuard, UnauthorizedrRedirect } from '@seed/passport';

@Controller()
export class HomeController {
  @View('app/index.html')
  @UseGuards(LocalAuthGuard)
  @UseFilters(UnauthorizedrRedirect)
  async index(): Promise<unknown> {
    return {
      title: 'nestjs + vite',
    };
  }
}
