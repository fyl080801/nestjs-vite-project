import { Injectable } from '@nestjs/common';
import { Role } from '../models/role';
import { User } from '../models/user';

@Injectable()
export class UserService {
  async findByName(username: string) {
    const result = await User.findOne({
      where: { username },
    });

    return result.toJSON() as User;
  }

  async verify(payload: any) {
    return (
      await User.findOne({
        where: { username: payload.username, id: payload.id },
      })
    ).toJSON() as User;
  }

  async getById(id: number) {
    const result = await User.findOne({ where: { id }, include: Role });
    return result;
  }
}
