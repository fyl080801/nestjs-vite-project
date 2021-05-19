import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ModelService {
  constructor(@Inject('DATA_MODELS') private readonly models: any[]) {}

  addModel(model: any) {
    this.models.push(model);
  }
}
