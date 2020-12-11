import { format, getHours, isBefore, startOfHour } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IApponitmentsRepository from '../repositories/IAppointmentsRepository';

// SOLID
// # Single Responsability Principle
// Open Closed Principle
// # Liskov Substitution Principle
// Interface Segregation Principle
// # Dependency Inversion Principle

// Single Reponsability Principle
// Dependency Injection Principle

/**
 * [X] Recebimento das informações
 * [X] Tratativa de erros/exceções
 * [X] Acesso ao repositório
 */

/**
 * Dependency Inversion (SOLID)
 * Sempre que houver uma dependencia externa, ao invés de contruí-lá na classe
 * service, nós iremos recebe-lá.
 */

/**
 * A regra de negócio foi abstraída em um único arquivo, um service.
 * Desta forma garantimos que caso essa regra de negócio venha ser usada novamente
 * utilizaemos o service, evitando a criação da mesma regra de negócio.
 * Não ferimos o principio DRY (Don't repeat yourself)
 */
@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IApponitmentsRepository,
    @inject('NotificationsRepository')
    private notifcationsRepository: INotificationsRepository,
  ) {}

  public async execute({
    date,
    user_id,
    provider_id,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const compareDate = new Date(Date.now());

    if (isBefore(appointmentDate, compareDate))
      throw new AppError("You can't create an appointment on a past date");

    if (user_id === provider_id)
      throw new AppError("You can't create an appointment with yourself");

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17)
      throw new AppError(
        'You can only create appointments between 8am and 5pm',
      );

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = await this.appointmentsRepository.create({
      user_id,
      provider_id,
      date: appointmentDate,
    });

    const dateFormatted = format(appointmentDate, "dd-MM-yyyy 'às' HH:mm");

    await this.notifcationsRepository.create({
      recipient_id: provider_id,
      content: `Novo agendamento para o dia ${dateFormatted}`,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
