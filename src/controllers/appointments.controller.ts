import { Authorized, Body, Controller, CurrentUser, Delete, Get, HttpCode, Param, Post, Put } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { Container } from 'typedi';
import { AppointmentService } from '@services/appointments.service';
import { UserRole } from '@interfaces/users.interface';
import { Appointment, CreateAppointmentData } from '@interfaces/appointments.interface';
import { CreateAppointmentDto, UpdateAppointmentDto } from '@dtos/appointments.dto';
import { CurrentUserInfo } from '@interfaces/auth.interface';
import { FilterQuery } from 'mongoose';

@Controller()
export class AppointmentController {
  public appointmentService = Container.get(AppointmentService);

  @Get('/appointments')
  @Authorized([UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT])
  @OpenAPI({ summary: 'Return a list of appointments' })
  async getAppointments(@CurrentUser() user: CurrentUserInfo) {
    const filter: FilterQuery<Appointment> = {};

    switch (user.user.role) {
      case UserRole.DOCTOR:
        filter.doctorId = user.doctor._id;
        break;
      case UserRole.PATIENT:
        filter.patientId = user.patient._id;
        break;
    }

    const appointments = await this.appointmentService.findAppointments(filter);

    return JSON.stringify({ data: appointments, message: 'findAll' });
  }

  @Post('/appointments')
  @HttpCode(201)
  @Authorized([UserRole.ADMIN, UserRole.PATIENT])
  @OpenAPI({ summary: 'Create a new appointment' })
  async createAppointment(@Body() appointmentData: CreateAppointmentDto, @CurrentUser() user: CurrentUserInfo) {
    const date = new Date(appointmentData.date);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    const createAppointmentData: CreateAppointmentData = {
      date,
      doctorId: appointmentData.doctorId,
      description: appointmentData.description,
      patientId: user.user.role === UserRole.PATIENT ? user.patient._id.toString() : appointmentData.patientId,
    };

    const createdAppointment = await this.appointmentService.createAppointment(createAppointmentData);

    return JSON.stringify({ data: createdAppointment, message: 'created' });
  }

  @Put('/appointments/:id')
  @Authorized([UserRole.ADMIN, UserRole.DOCTOR])
  @OpenAPI({ summary: 'Update an appointment' })
  async updateAppointment(@Param('id') id: string, @Body() appointmentData: UpdateAppointmentDto, @CurrentUser() user: CurrentUserInfo) {
    const filter: FilterQuery<Appointment> = { _id: id };

    if (user.user.role === UserRole.DOCTOR) {
      filter.doctorId = user.doctor._id;
    }

    const updateAppointmentData: Appointment = await this.appointmentService.updateAppointment(filter, appointmentData);
    return JSON.stringify({ data: updateAppointmentData, message: 'updated' });
  }

  @Delete('/appointments/:id')
  @Authorized([UserRole.ADMIN])
  @OpenAPI({ summary: 'Delete an appointment' })
  async deleteAppointment(@Param('id') id: string) {
    const deletedAppointment = await this.appointmentService.deleteAppointment({ _id: id });
    return JSON.stringify({ data: deletedAppointment, message: 'deleted' });
  }
}
