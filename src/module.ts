import { Module } from '@nestjs/common';
import { AppModule } from '@seed/app';
import { ViteServiceModule } from '@seed/vite_service';
import { AdminLoginModule } from '@seed/admin_login';
import { PassportModule } from '@seed/passport';

@Module({
  imports: [AppModule, PassportModule, ViteServiceModule, AdminLoginModule],
  controllers: [],
  providers: [],
})
export class MainModule {}
