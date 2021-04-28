import { applyDecorators, UseFilters, UseGuards } from '@nestjs/common';
import {
  UnauthorizedrRedirect,
  UnauthorizedrPathRedirect,
} from '../filter/unauthorized';
import { LocalAuthGuard } from '../guard/local';

export interface AuthorizationOptions {
  redirect?: boolean | string;
}

export const Authorization = (options: AuthorizationOptions = {}) => {
  const list = [UseGuards(LocalAuthGuard)];

  if (options.redirect === true) {
    list.push(UseFilters(UnauthorizedrRedirect));
  } else if (typeof options.redirect === 'string') {
    list.push(UseFilters(new UnauthorizedrPathRedirect(options.redirect)));
  }

  return applyDecorators(...list);
};
