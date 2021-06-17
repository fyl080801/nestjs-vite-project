export interface AppConfig {
  title: string;
  description?: string;
  modulePath?: string;
  apps?: { [key: string]: any };
}
