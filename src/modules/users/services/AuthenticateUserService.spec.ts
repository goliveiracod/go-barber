import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const authenticateUser = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'jest',
      email: 'jest@jest',
      password: 'jest',
    });

    const authenticate = await authenticateUser.execute({
      email: 'jest@jest',
      password: 'jest',
    });

    expect(authenticate.user).toEqual(user);
    expect(authenticate).toHaveProperty('token');
  });

  it('should not be able to authenticate with a user that does not exist', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    await expect(
      authenticateUser.execute({
        email: 'jest@jest',
        password: 'jest',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be not able to authenticate with an incorrect email and password combination', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const authenticateUser = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      name: 'jest',
      email: 'jest@jest',
      password: 'jest',
    });

    await expect(
      authenticateUser.execute({
        email: 'jest@jest',
        password: 'jestIncorredPassword',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
