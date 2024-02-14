import User from '../interfaces/UserInterface';

export default class Users {
  private static instance: Users;

  private constructor(
    private users: User[] = [
      {
        id: 'a32e059d-20af-4522-940a-5095c9742172',
        username: 'Strider',
        age: 36,
        hobbies: ['videogames', 'development'],
      },
      {
        id: 'a32e059d-20af-4522-940a-5095c9744172',
        username: 'Elon Musk',
        age: 52,
        hobbies: ['space', 'green energy', 'peace'],
      },
    ]
  ) {}

  public static getInstance(): Users {
    if (!Users.instance) {
      Users.instance = new Users();
    }

    return Users.instance;
  }

  public getUsers() {
    return JSON.stringify(this.users);
  }

  public getUser(id: string) {
    const user = this.users.find((el) => el.id === id);
    return JSON.stringify(user) || '';
  }

  public addUser(user: User) {
    user.id = crypto.randomUUID();
    this.users.push(user);
    return JSON.stringify(user);
  }

  public updateUser(user: User, userId: string) {
    const currentRecordingIndex = this.getUserIndex(userId || '');
    if (currentRecordingIndex !== -1) {
        this.users[currentRecordingIndex] = {...user, id: userId };
        return JSON.stringify(user);
    } else {
        return '';
    }
  }

  public deleteUser(id: string) {
    const currentRecordingIndex = this.getUserIndex(id);
    if (currentRecordingIndex !== -1) {
        this.users.splice(currentRecordingIndex, 1);
        return true;
    } else {
        return false;
    }
  }

  private getUserIndex(id: string) {
    return this.users.findIndex((el) => el.id === id);
  }
}
