import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import ListProviderService from './ListProviderService';

let fakeUserRepository: FakeUserRepository;
let listProvider: ListProviderService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    listProvider = new ListProviderService(fakeUserRepository);
  });

  it('should be able to list the providers', async () => {
    const user = await fakeUserRepository.create({
      name: 'jest',
      email: 'jest@jest',
      password: 'jest',
    });

    const user1 = await fakeUserRepository.create({
      name: 'jest 1',
      email: 'jest1@jest',
      password: 'jest1',
    });

    const loggedUser = await fakeUserRepository.create({
      name: 'jest 2',
      email: 'jest2@jest',
      password: 'jest2',
    });

    const providers = await listProvider.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user, user1]);
  });
});
