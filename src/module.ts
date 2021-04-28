import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppModule } from '@seed/app';
import { ViteServiceModule } from '@seed/vite_service';
import { AdminLoginModule } from '@seed/admin_login';
import { PassportModule } from '@seed/passport';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    AppModule,
    PassportModule,
    ViteServiceModule,
    AdminLoginModule,
  ],
  controllers: [],
  providers: [],
})
export class MainModule {}
