import { Controller, Get } from '@nestjs/common';
import { AppService } from '../service/app';

@Controller('custom')
export class CustomController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getJson(): Record<string, unknown> {
    return { test: 'aaa', text: this.appService.getHello() };
  }
}
