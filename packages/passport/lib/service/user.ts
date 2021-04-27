import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UserService {
  private readonly users = [
    {
      userId: 1,
      username: 'admin',
      password: '123',
    },
    {
      userId: 2,
      username: 'guest',
      password: '123',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    console.log(username);
    return this.users.find((user) => user.username === username);
  }
}
