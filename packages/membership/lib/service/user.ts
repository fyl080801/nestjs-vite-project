import { Injectable } from '@nestjs/common';
import { DataContextService } from '@nestseed/data_access';
import { User } from '../models/user';

@Injectable()
export class UserService {
  // private readonly users = [
  //   {
  //     id: 1,
  //     username: 'admin',
  //     password: '123',
  //     roles: ['admin'],
  //   },
  //   {
  //     id: 2,
  //     username: 'user',
  //     password: '123',
  //     roles: ['user'],
  //   },
  //   {
  //     id: 3,
  //     username: 'guset',
  //     password: '123',
  //     roles: ['guset'],
  //   },
  // ];

  constructor(private readonly context: DataContextService) {}

  async findOne(username: string): Promise<any | undefined> {
    return await (
      await this.context.set(User)
    ).findOne({ where: { username } });
    // return this.users.find((user) => user.username === username);
  }

  async verify(payload: any) {
    return await (
      await this.context.set(User)
    ).findOne({ where: { username: payload.username, id: payload.id } });
    // return this.users.find(
    //   (user) => user.username === payload.username && user.id === payload.id,
    // );
  }
}