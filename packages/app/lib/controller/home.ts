import { ViteService } from '@seed/vite_service';
import { Controller } from '@nestjs/common';
import { View } from '@seed/vite_service';

@Controller()
export class HomeController {
  constructor(private readonly vite: ViteService) {}

  @View('app/index.html')
  async index(): Promise<unknown> {
    return {
      title: 'nestjs + vite',
    };
  }
}
