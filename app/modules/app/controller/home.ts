import { Controller, Get, Header } from '@nestjs/common';
// import { AppService } from '../service/app';
import { ViteService } from '../../viteService';

@Controller()
export class HomeController {
  constructor(private readonly viteService: ViteService) {}

  @Get()
  @Header('Content-Type', 'text/html')
  async index(): Promise<string> {
    return await this.viteService.render('app/client/index.html');
  }
}
