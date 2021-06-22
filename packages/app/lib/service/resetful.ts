import { Injectable, Scope } from '@nestjs/common';
import { DataContextService } from '@nestseed/data_access';
import { ServerResponse } from 'http';
import { RestfulHandler } from '../types';
import {
  handleResourceDescribe,
  handleResourceIndex,
  handleResourceCreate,
} from '../utils/resource';

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

@Injectable({ scope: Scope.REQUEST })
export class IndexRestfulHandler extends BaseHandler implements RestfulHandler {
  constructor(private readonly context: DataContextService) {
    super();
  }

  invoke(matched: string[], req: any, res: ServerResponse) {
    if (req.method === 'GET') {
      this.handleIndex(res);
    } else {
      this.handleError(res, 'Route does not match known patterns.');
    }
  }

  handleIndex(res: ServerResponse) {
    const { models } = this.context.connection();

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

@Injectable({ scope: Scope.REQUEST })
export class ResourceRestfulHandler
  extends BaseHandler
  implements RestfulHandler
{
  methods = {
    GET: handleResourceIndex,
    HEAD: handleResourceDescribe,
    POST: handleResourceCreate,
  };

  constructor(private readonly context: DataContextService) {
    super();
  }

  invoke(matched: string[], req: any, res: ServerResponse): void {
    this.handleResource(matched[0], req, res);
  }

  async handleResource(name: string, req: any, res: ServerResponse) {
    const { models } = this.context.connection();
    const model = models[name];

    if (!model) {
      this.handleError(res, 'Route does not match known model.');
      return;
    }

    try {
      const result = await this.methods[req.method](req, model);
      this.handleSuccess(res, result);
    } catch (ex) {
      console.log(ex);
      this.handleError(res, ex.message);
    }
  }
}
