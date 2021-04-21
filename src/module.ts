import { Module } from '@nestjs/common';
import { AppModule } from '@seed/app';
import { ViteServiceModule } from '@seed/vite_service';
import { AdminLoginModule } from '@seed/admin_login';

@Module({
  imports: [AppModule, ViteServiceModule, AdminLoginModule],
  controllers: [],
  providers: [],
})
export class MainModule {}
