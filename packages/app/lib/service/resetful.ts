import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataContextService } from '@nestseed/data_access';
import { ServerResponse } from 'http';
import { AppConfig, RestfulHandler } from '../types';

class BaseHandler {
  handleError(res: ServerResponse, msg: string) {
    res.statusCode = 500;
    res.statusMessage = msg;
    res.end();
  }

  handleSuccess(res: ServerResponse, result: any) {
    res.setHeader('content-type', 'application/json');
    res.write(JSON.stringify(result));
    res.end();
  }
}

@Injectable()
export class IndexRestfulHandler extends BaseHandler implements RestfulHandler {
  constructor(
    private readonly configService: ConfigService,
    private readonly context: DataContextService,
  ) {
    super();
  }

  invoke(req: any, res: ServerResponse) {
    const config = this.configService.get<AppConfig>('app');
    if (
      req.method === 'GET' &&
      (req.originalUrl === config?.openapiPrefix || 'openapi')
    ) {
      this.handleIndex(res);
    } else {
      this.handleError(res, 'Route does not match known patterns.');
    }
  }

  handleIndex(res: ServerResponse) {
    const models = this.context.connection().models;
    const result = Object.keys(models).map((key) => {
      return {
        name: models[key].name,
        tableName: models[key].tableName,
      };
    });

    // if (this.options.allowed.length > 0) {
    //   var allowed = this.options.allowed;
    //   result = result.filter(function (element) {
    //     return allowed.indexOf(element.tableName) != -1;
    //   });
    // }

    this.handleSuccess(res, result);
  }
}

// @Injectable()
// export class ModelResource {
//   constructor(private readonly context: DataContextService) {}

//   async index(name: string, query?: any) {
//     const where = !!query ? { where: query } : {};

//     const result = await this.context.connection().models[name].findAll(where);

//     return result;
//   }

//   describe(name: string) {
//     //
//   }

//   create(name: string, attributes) {
//     //
//   }

//   update(name: string, identifier, attributes) {
//     //
//   }

//   drop(name: string, identifier) {
//     //
//   }
// }
