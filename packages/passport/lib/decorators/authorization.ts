import { applyDecorators, UseFilters, UseGuards } from '@nestjs/common';
import {
  UnauthorizedrRedirect,
  UnauthorizedrPathRedirect,
} from '../filter/unauthorized';
import { AuthorizationAuthGuard } from '../guard/authorization';

export interface AuthorizationOptions {
  redirect?: boolean | string;
}

export const Authorization = (options: AuthorizationOptions = {}) => {
  const list = [UseGuards(AuthorizationAuthGuard)];

  // 这里决定会话验证失败的跳转行为
  if (options.redirect === true) {
    list.push(UseFilters(UnauthorizedrRedirect));
  } else if (typeof options.redirect === 'string') {
    list.push(UseFilters(new UnauthorizedrPathRedirect(options.redirect)));
  }

  return applyDecorators(...list);
};
