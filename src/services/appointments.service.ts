import { Service } from 'typedi';
import { Appointment, CreateAppointmentData, UpdateAppointmentData } from '@interfaces/appointments.interface';
import { AppointmentModel } from '@models/appointments.model';
import { FilterQuery } from 'mongoose';
import { HttpException } from '@exceptions/httpException';

@Service()
export class AppointmentService {
  async findAppointments(filter: FilterQuery<Appointment>) {
    return AppointmentModel.find(filter);
  }

  async findAppointment(filter: FilterQuery<Appointment>): Promise<Appointment> {
    return AppointmentModel.findOne(filter);
  }

  async createAppointment(appointmentData: CreateAppointmentData) {
    const hydratedAppointment = new AppointmentModel({
      doctorId: appointmentData.doctorId,
      patientId: appointmentData.patientId,
      description: appointmentData.description,
      date: appointmentData.date,
    });

    try {
      const appointment = await hydratedAppointment.save();

      return appointment;
    } catch (e) {
      if (e.code === 11000) throw new HttpException(409, "Doctor isn't available at this time");
    }
  }

  async updateAppointment(filter: FilterQuery<Appointment>, appointmentData: UpdateAppointmentData): Promise<Appointment> {
    const appointment = await AppointmentModel.findOne(filter);

    if (!appointment) {
      throw new HttpException(404, `Appointment not exists`);
    }

    appointment.description = appointmentData.description;
    appointment.date = appointmentData.date;
    appointment.status = appointmentData.status;

    return appointment.save();
  }

  async deleteAppointment(filter: FilterQuery<Appointment>): Promise<Appointment> {
    const appointment = await AppointmentModel.findOneAndDelete(filter);

    if (!appointment) {
      throw new HttpException(204, `Appointment not exists`);
    }

    return appointment;
  }
}
