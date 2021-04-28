import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guard/jwt';

export interface AuthorizationOptions {
  redirect?: boolean | string;
}

export const Jwt = () => {
  return applyDecorators(UseGuards(JwtAuthGuard));
};
