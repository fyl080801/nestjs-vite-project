export interface AppConfig {
  title: string;
  description?: string;
  modulePath?: string;
  openapiPrefix?: string;
  apps?: { [key: string]: any };
}
