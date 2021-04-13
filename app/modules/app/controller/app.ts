import { Controller, Get } from '@nestjs/common';
import { AppService } from '../service/app';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  hello(): string {
    return this.appService.getHello();
  }
}
