import { Injectable } from '@nestjs/common';
import { DataContextService } from '@nestseed/data_access';

@Injectable()
export class ModelResource {
  constructor(private readonly context: DataContextService) {}

  async index(name: string, query?: any) {
    const where = !!query ? { where: query } : {};

    const result = await this.context.connection().models[name].findAll(where);

    return result;
  }

  describe(name: string) {
    //
  }

  create(name: string, attributes) {
    //
  }

  update(name: string, identifier, attributes) {
    //
  }

  drop(name: string, identifier) {
    //
  }
}
