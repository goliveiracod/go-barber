import 'dotenv/config';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
  });

  it('should be able to authenticate', async () => {
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
