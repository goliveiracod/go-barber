import AppError from '@shared/errors/AppError';

import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import CreateUserService from './CreateUserService';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'jest',
      email: 'jest@jest',
      password: 'jest',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with an email that already exists', async () => {
    const user = {
      name: 'jest',
      email: 'jest@jest',
      password: 'jest',
    };

    await createUser.execute(user);

    await expect(createUser.execute(user)).rejects.toBeInstanceOf(AppError);
  });
});
