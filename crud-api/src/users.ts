import User from './interfaces/users';

export default class Users {
  private users: User[];

  constructor() {
    this.users = [
      {
        id: '3d7e8a9b-7c5c-4c3d-8d5e-6f7f6c7d8f9a',
        username: 'strider',
        age: 35,
        hobbies: ['dota', 'js', 'canada'],
      },
      {
        id: '3d7e8a9b-7c5c-4c3d-8d5e-6f7f6c7d8f9a',
        username: 'strider',
        age: 35,
        hobbies: ['dota', 'js', 'canada'],
      },
      {
        id: '3d7e8a9b-7c5c-4c3d-8d5e-6f7f6c7d8f9a',
        username: 'strider',
        age: 35,
        hobbies: ['dota', 'js', 'canada'],
      },
    ];
  }

  getUsers(): string {
    return JSON.stringify(this.users);
  }
}
