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
import { ViteService } from '../service/vite';

@Injectable({ scope: Scope.REQUEST })
export class ViewInterceptor implements NestInterceptor {
  constructor(private readonly view: string) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();

    return next.handle().pipe(
      map(async (data) => {
        const vite = new ViteService(request);
        await vite.bootstrap();
        return await vite.render(this.view, data);
      }),
    );
  }
}

export const View = (path: string, view?: string) => {
  const pathAndView = path && view;

  return applyDecorators(
    Get(pathAndView ? path : undefined),
    UseInterceptors(new ViewInterceptor(pathAndView ? view : path)),
    Header('Content-Type', 'text/html'),
  );
};
