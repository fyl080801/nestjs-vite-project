import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataContextService, ModelService } from '@nestseed/data_access';
import { DataTypes } from 'sequelize';
import { AppConfig } from '../types';
import * as yaml from 'js-yaml';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class AppsService {
  constructor(
    private readonly context: DataContextService,
    private readonly modelService: ModelService,
    private readonly configService: ConfigService,
  ) {}

  initModels() {
    const config = this.configService.get<AppConfig>('app');

    const modulePath = path.resolve(
      process.cwd(),
      config.modulePath || './config/apps',
    );
    const enables = Array.isArray(config.apps)
      ? config.apps
      : Object.keys(config.apps || {})
          .filter((key) => config.apps[key])
          .map((key) => key);

    const modules = fs.readdirSync(modulePath);

    const enableModules = modules.filter(
      (m) => (enables || modules).indexOf(m) >= 0,
    );

    enableModules.forEach((m) => {
      try {
        const moduleFeatures = fs.readdirSync(
          path.resolve(modulePath, m, 'model'),
        );

        moduleFeatures.forEach((f) => {
          const modelName = f.split('.')[0];
          const modelDefine = yaml.load(
            fs.readFileSync(path.resolve(modulePath, m, 'model', f), 'utf8'),
          ) as Record<string, any>;

          modelDefine.config = modelDefine.config || {
            createdAt: false,
            updatedAt: false,
          };
          modelDefine.config.tableName =
            modelDefine.config.tableName || modelName;

          const columns = Object.keys(modelDefine.columns || {}).reduce(
            (pre, key) => {
              pre[key] = {
                ...modelDefine.columns[key],
                type: new Function(
                  'DataTypes',
                  `return DataTypes.${modelDefine.columns[key].type}`,
                )(DataTypes),
              };
              return pre;
            },
            {},
          );

          this.context
            .connection()
            .define(modelName, columns, modelDefine.config);
        });
      } catch {}
    });
  }
}
