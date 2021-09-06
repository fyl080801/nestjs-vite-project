import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  applyDecorators,
  UseInterceptors,
  Get,
  Header,
  Scope,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ViewService } from '../service/view';
import { getCallerFile } from '../utils/helper';

@Injectable({ scope: Scope.REQUEST })
export class ViewInterceptor implements NestInterceptor {
  constructor(private readonly view?: ViewService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const view = request.headers['view-path'];

    return next.handle().pipe(
      map(async (data) => {
        return await this.view.render(view, data);
      }),
    );
  }
}

@Injectable({ scope: Scope.REQUEST })
export class RequestHeaderInterceptor implements NestInterceptor {
  constructor(private readonly view: string) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    request.headers['view-path'] = this.view;

    return next.handle();
  }
}

export const View = (path: string, view?: string) => {
  // 能否自动获取调用函数所在文件，找到属于哪个模块?
  const filename = getCallerFile()(new Error());
  console.log(filename);

  const pathAndView = path && view;
  return applyDecorators(
    Get(pathAndView ? path : undefined),
    UseInterceptors(
      new RequestHeaderInterceptor(pathAndView ? view : path),
      ViewInterceptor,
    ),
    Header('Content-Type', 'text/html'),
  );
};
