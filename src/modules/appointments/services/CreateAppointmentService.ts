import { startOfHour } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

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
  ) {}

  public async execute({
    date,
    provider_id,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
