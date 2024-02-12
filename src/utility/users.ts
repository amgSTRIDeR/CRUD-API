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
        hobbies: ['space', 'green enrgy', 'peace'],
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
}
