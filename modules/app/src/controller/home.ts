import { ViteService } from '@seed/vite_service';
import { Controller, Get, Header } from '@nestjs/common';

@Controller()
export class HomeController {
  constructor(private readonly vite: ViteService) {}

  @Get()
  @Header('Content-Type', 'text/html')
  async index(): Promise<string> {
    return await this.vite.render('app/client/index.html', {
      title: 'nestjs + vite',
    });
  }
  // @Get()
  // index(): string {
  //   return 'hello';
  // }
}
