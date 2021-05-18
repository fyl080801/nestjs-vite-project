import { Inject, Module, OnModuleInit } from '@nestjs/common';
import { DataAccessModule } from '@nestseed/data_access';
import { UserService } from './service/user';
import { User } from './models/user';

@Module({
  imports: [DataAccessModule],
  providers: [UserService],
  exports: [UserService],
})
export class MembershipModule implements OnModuleInit {
  constructor(@Inject('DATA_MODELS') private readonly dataModels: any[]) {}

  onModuleInit() {
    this.dataModels.push(User);
  }
}

export { UserService, User };
