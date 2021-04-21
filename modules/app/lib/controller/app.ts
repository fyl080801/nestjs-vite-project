import { Controller, Get } from '@nestjs/common';

@Controller('app')
export class AppController {
  @Get('hello')
  hello() {
    return 'hello x3 !!';
  }
}
