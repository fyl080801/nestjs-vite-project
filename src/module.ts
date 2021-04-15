import { Module } from '@nestjs/common';
import { AppModule } from '@seed/app';
import { ViteServiceModule } from '@seed/vite_service';

@Module({
  imports: [AppModule, ViteServiceModule],
  controllers: [],
  providers: [],
})
export class MainModule {}
