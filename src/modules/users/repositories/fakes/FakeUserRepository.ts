import { v4 as uuid } from 'uuid';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IFindAllProvidersDTO from '@modules/appointments/dtos/lFindAllProvidersDTO';

export default class FakeUserRepository implements IUsersRepository {
  private users: User[] = [];

  public async findAllProviders({
    except_user_id,
  }: IFindAllProvidersDTO): Promise<User[]> {
    let { users } = this;

    if (except_user_id)
      users = this.users.filter(user => user.id !== except_user_id);

    return users;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = this.users.find(element => element.id === id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(element => element.email === email);

    return user;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid() }, userData);

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const findByIndex = this.users.findIndex(element => element.id === user.id);
    Object.assign(this.users[findByIndex], user);
    return user;
  }
}
