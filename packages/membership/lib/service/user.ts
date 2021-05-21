import { Injectable } from '@nestjs/common';
import { User } from '../models/user';

@Injectable()
export class UserService {
  async findOne(username: string) {
    return await User.findOne({ where: { username } });
  }

  async verify(payload: any) {
    return await User.findOne({
      where: { username: payload.username, id: payload.id },
    });
  }
}
