import { ServerResponse } from 'http';

export interface AppConfig {
  title: string;
  description?: string;
  modulePath?: string;
  openapiPrefix?: string;
  apps?: { [key: string]: any };
}

export interface RestfulHandler {
  invoke(matched: string[], req: any, res: ServerResponse): void;
}
