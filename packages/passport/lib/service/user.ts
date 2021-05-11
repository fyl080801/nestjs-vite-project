import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UserService {
  private readonly users = [
    {
      id: 1,
      username: 'admin',
      password: '123',
      roles: ['admin'],
    },
    {
      id: 2,
      username: 'user',
      password: '123',
      roles: ['user'],
    },
    {
      id: 3,
      username: 'guset',
      password: '123',
      roles: ['guset'],
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async verify(payload: any) {
    return this.users.find(
      (user) => user.username === payload.username && user.id === payload.id,
    );
  }
}
