import { Controller, Get } from '@nestjs/common';
import { AppService } from '../service/app';
import { ViteService } from '../../viteService';

@Controller()
export class HomeController {
  constructor(
    private readonly appService: AppService,
    private readonly vite: ViteService,
  ) {}

  @Get()
  getHello(): string {
    console.log(this.vite);
    return this.appService.getHello();
  }
}
