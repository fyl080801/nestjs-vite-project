import { Controller, Get, Header } from '@nestjs/common';
import { ViteService } from '../../vite-service';

@Controller('setup')
export class HomeController {
  constructor(private readonly vite: ViteService) {}

  @Get()
  @Header('Content-Type', 'text/html')
  async index() {
    return await this.vite.render('setup/client/index.html', {
      title: 'setup',
    });
  }
}
