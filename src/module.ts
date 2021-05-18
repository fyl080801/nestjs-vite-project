import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppModule } from '@nestseed/app';
import { ViewServiceModule } from '@nestseed/view_service';
import { AdminLoginModule } from '@nestseed/admin_login';
import { PassportModule } from '@nestseed/passport';
import { DataAccessModule } from '@nestseed/data_access';
import { MembershipModule } from '@nestseed/membership';
import config from './config';
import { HttpAdapterHost } from '@nestjs/core';
import cookie from 'fastify-cookie';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { CookieConfig } from './types';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    DataAccessModule,
    AppModule,
    MembershipModule,
    PassportModule,
    ViewServiceModule,
    AdminLoginModule,
  ],
  controllers: [],
  providers: [],
})
export class MainModule implements OnModuleInit {
  constructor(
    private readonly adapterHost: HttpAdapterHost,
    private readonly configService: ConfigService,
  ) {}

  onModuleInit() {
    const config = this.configService.get<CookieConfig>('cookie');

    this.adapterHost.httpAdapter
      .getInstance<NestFastifyApplication>()
      .register(cookie, { secret: config?.secret });
  }
}
