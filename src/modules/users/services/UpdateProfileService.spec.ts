import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfile = new UpdateProfileService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'jest',
      email: 'jest@jest',
      password: 'jest',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'root',
      email: 'root@root',
    });

    expect(updatedUser.name).toBe('root');
  });

  it('should not be able to change to another user email', async () => {
    await fakeUserRepository.create({
      name: 'root',
      email: 'root@root',
      password: 'root',
    });

    const user = await fakeUserRepository.create({
      name: 'jest',
      email: 'jest@jest',
      password: 'jest',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'root',
        email: 'root@root',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password', async () => {
    const user = await fakeUserRepository.create({
      name: 'jest',
      email: 'jest@jest',
      password: 'jest',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'jest',
      email: 'jest@jest',
      old_password: 'jest',
      password: 'jest123',
    });

    expect(updatedUser.password).toBe('jest123');
  });

  it('should not be able to update the password if the old password entered is not the same as the password to be updated', async () => {
    const user = await fakeUserRepository.create({
      name: 'jest',
      email: 'jest@jest',
      password: 'jest',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'jest',
        email: 'jest@jest',
        old_password: 'old_different_password',
        password: 'jest123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to show the profile from non-existing user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non-existing-user-id',
        name: 'root',
        email: 'root@root',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
