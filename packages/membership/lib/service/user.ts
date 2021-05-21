import { Injectable } from '@nestjs/common';
import { User } from '../models/user';
// import { Role } from '../models/role';

@Injectable()
export class UserService {
  async findOne(username: string) {
    const result = await User.findOne({
      where: { username },
    });
    console.log(result);
    return result;
  }

  async verify(payload: any) {
    return await User.findOne({
      where: { username: payload.username, id: payload.id },
    });
  }
}
