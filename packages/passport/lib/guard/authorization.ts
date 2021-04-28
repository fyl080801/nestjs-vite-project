import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// UseGuards 这里增加支持的会话策略
@Injectable()
export class AuthorizationAuthGuard extends AuthGuard([
  'local',
  'jwt',
  'cookie',
]) {}
