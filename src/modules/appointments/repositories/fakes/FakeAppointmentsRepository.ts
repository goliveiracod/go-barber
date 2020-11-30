import { v4 as uuid } from 'uuid';
import { isEqual } from 'date-fns';

import IApponitmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

class FakeAppointmentsRepository implements IApponitmentsRepository {
  private appointments: Appointment[] = [];

  public async find(): Promise<Appointment[]> {
    return this.appointments;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(element =>
      isEqual(element.date, date),
    );

    return findAppointment;
  }

  public async create({
    date,
    provider_id,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointments = new Appointment();

    Object.assign(appointments, { id: uuid(), date, provider_id });

    this.appointments.push(appointments);

    return appointments;
  }
}

export default FakeAppointmentsRepository;
