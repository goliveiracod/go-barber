import AppError from '@shared/errors/AppError';

import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const createUser = new CreateUserService(fakeUserRepository);

    const user = await createUser.execute({
      name: 'jest',
      email: 'jest@jest',
      password: 'jest',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with an email that already exists', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const createUser = new CreateUserService(fakeUserRepository);

    const user = {
      name: 'jest',
      email: 'jest@jest',
      password: 'jest',
    };

    await createUser.execute(user);

    expect(createUser.execute(user)).rejects.toBeInstanceOf(AppError);
  });
});
