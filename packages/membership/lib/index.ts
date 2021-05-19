import { Module, OnModuleInit } from '@nestjs/common';
import { DataAccessModule, ModelService } from '@nestseed/data_access';
import { UserService } from './service/user';
import { User } from './models/user';

@Module({
  imports: [DataAccessModule],
  providers: [UserService],
  exports: [UserService],
})
export class MembershipModule implements OnModuleInit {
  constructor(private readonly modelService: ModelService) {}

  onModuleInit() {
    this.modelService.addModel(User);
    // this.dataModels.push(Role);
  }
}

export { UserService, User };
