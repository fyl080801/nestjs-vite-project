import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { AuthConfig } from '../types';

@Catch(UnauthorizedException)
export class UnauthorizedRedirect implements ExceptionFilter {
  constructor(private readonly configService: ConfigService) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const config = this.configService.get<AuthConfig>('auth', {});

    // 要从配置里获取
    return response.redirect(`${config.loginUrl}?returnUrl=${request.url}`);
  }
}

@Catch(UnauthorizedException)
export class UnauthorizedPathRedirect implements ExceptionFilter {
  constructor(private readonly redirect: string) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // const request = ctx.getRequest<Request>();

    // 要从配置里获取
    return response.redirect(this.redirect);
  }
}
