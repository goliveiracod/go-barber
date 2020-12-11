import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeUsersRepository: FakeUserRepository;
let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointmentsService: ListProviderAppointmentsService;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUserRepository();
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderAppointmentsService = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the provider appointments on a specific day', async () => {
    const providerUser = await fakeUsersRepository.create({
      name: 'provider',
      email: 'provider@provider',
      password: 'provider',
    });

    const customerUser = await fakeUsersRepository.create({
      name: 'customer',
      email: 'customer@customer',
      password: 'customer',
    });

    const customerUser1 = await fakeUsersRepository.create({
      name: 'customer1',
      email: 'customer1@customer',
      password: 'customer1',
    });

    const appointment = await fakeAppointmentsRepository.create({
      provider_id: providerUser.id,
      date: new Date(2020, 4, 20, 15),
      user_id: customerUser.id,
    });

    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: providerUser.id,
      date: new Date(2020, 4, 20, 16),
      user_id: customerUser1.id,
    });

    const appointments = await listProviderAppointmentsService.execute({
      provider_id: providerUser.id,
      year: 2020,
      month: 5,
      day: 20,
    });

    expect(appointments).toEqual([appointment, appointment1]);
  });
});
