import { Controller, Get } from '@nestjs/common';
import { AppService } from '../service/app';
// import { ViteService } from '../../viteService';

@Controller()
export class HomeController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
