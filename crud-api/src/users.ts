import getStringifyMessage from './common/getStringifyMessage';
import User from './interfaces/users';
import { v4 as uuidv4 } from 'uuid';

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
    ];
  }

  getUsers(): string {
    if (this.users.length === 0) {
      return getStringifyMessage('No users found');
    }
    return JSON.stringify(this.users);
  }

  getUser(userId: string): string | undefined {
    const user = this.users.find((user) => user.id === userId);
    return user ? JSON.stringify(user) : undefined;
  }

  addUser(user: User): string | undefined {
    const isHobbyArrayOfStrings = user.hobbies.every((hobby) => typeof hobby === 'string');

    if (!user.username || typeof user.username !== 'string' || !user.age || typeof user.age !== 'number' || user.age < 0 || !user.hobbies || !Array.isArray(user.hobbies) || !isHobbyArrayOfStrings) {
      return undefined;
    }

    const newUser = {
      id: uuidv4(),
      username: user.username,
      age: user.age,
      hobbies: user.hobbies,
    };
    
    this.users.push(newUser);
    return JSON.stringify(newUser);
  }
}
