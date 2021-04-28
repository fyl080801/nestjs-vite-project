import {
  applyDecorators,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Scope,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  UnauthorizedrRedirect,
  UnauthorizedrPathRedirect,
} from '../filter/unauthorized';
import { AuthorizationAuthGuard } from '../guard/authorization';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { AuthConfig } from '../types';
import { JwtService } from '@nestjs/jwt';

export interface AuthorizationOptions {
  redirect?: boolean | string;
}

@Injectable({ scope: Scope.REQUEST })
export class AuthenticatedInterceptor implements NestInterceptor {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwt: JwtService,
  ) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse<Response>();
    const authConfig = this.configService.get<AuthConfig>('auth', {});

    return next.handle().pipe(
      map((data) => {
        // const jwtdata = this.jwt.decode(data.access_token, { json: true }) as {
        //   [key: string]: string;
        // };

        response.cookie(authConfig.cookie?.name || 'token', data.access_token, {
          httpOnly: true,
          path: '/',
          secure: true,
          // expires: new Date(jwtdata.expiresIn),
        });
        response.redirect(302, request.query.returnUrl || '/');

        return data;
      }),
    );
  }
}

export const Authentication = (options: AuthorizationOptions = {}) => {
  const list = [UseGuards(AuthorizationAuthGuard)];

  // 这里决定会话验证失败的跳转行为
  if (options.redirect === true) {
    list.push(UseFilters(UnauthorizedrRedirect));
  } else if (typeof options.redirect === 'string') {
    list.push(UseFilters(new UnauthorizedrPathRedirect(options.redirect)));
  }

  return applyDecorators(...list);
};

export const Authenticated = () => {
  return applyDecorators(UseInterceptors(AuthenticatedInterceptor));
};
