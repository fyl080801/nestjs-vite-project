import { Module } from '@nestjs/common';
import { HomeController } from './controller/home';
import { ViteServiceModule } from '@seed/vite_service';

@Module({
  imports: [ViteServiceModule],
  controllers: [HomeController],
})
export class AdminLoginModule {}
