import { Controller, Get, Header } from '@nestjs/common';
import { ViteService } from '@seed/vite_service';

@Controller('admin_login')
export class HomeController {
  constructor(private readonly vite: ViteService) {}

  @Get()
  @Header('Content-Type', 'text/html')
  async index() {
    return this.vite.render('admin_login/src/index.html', {
      title: 'Admin Login',
    });
    //
  }
}
