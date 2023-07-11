import { Authorized, Body, Controller, Delete, Get, Param, Post, Put } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { Container } from 'typedi';
import { DoctorService } from '@services/doctors.service';
import { UserRole } from '@interfaces/users.interface';
import { CreateDoctorDto, UpdateDoctorDto } from '@dtos/doctors.dto';
import { UserService } from '@services/users.service';
import { HttpException } from '@exceptions/httpException';
import { AppointmentService } from '@services/appointments.service';

@Controller()
export class DoctorController {
  public userService = Container.get(UserService);
  public doctorService = Container.get(DoctorService);
  public appointmentService = Container.get(AppointmentService);

  @Get('/doctors')
  @Authorized([UserRole.ADMIN, UserRole.PATIENT])
  @OpenAPI({ summary: 'Return a list of doctors' })
  async getDoctors() {
    const doctors = await this.doctorService.findDoctors({});
    return JSON.stringify({ data: doctors, message: 'findAll' });
  }

  @Post('/doctors')
  @Authorized([UserRole.ADMIN])
  @OpenAPI({ summary: 'Create a doctor' })
  async createDoctor(@Body() doctorData: CreateDoctorDto) {
    const createdUser = await this.userService.createUser({
      email: doctorData.email,
      password: doctorData.password,
      role: UserRole.DOCTOR,
    });

    const createdDoctor = await this.doctorService.createDoctor({
      firstName: doctorData.firstName,
      lastName: doctorData.lastName,
      address: doctorData.address,
      phoneNumber: doctorData.phoneNumber,
      speciality: doctorData.speciality,
      userId: createdUser._id,
    });
    return JSON.stringify({ data: createdDoctor, message: 'created' });
  }

  @Put('/doctors/:id')
  @Authorized([UserRole.ADMIN])
  @OpenAPI({ summary: 'Update a doctor' })
  async updateDoctor(@Param('id') id: string, @Body() doctorData: UpdateDoctorDto) {
    const updatedDoctor = await this.doctorService.updateDoctor(
      { _id: id },
      {
        firstName: doctorData.firstName,
        lastName: doctorData.lastName,
        phoneNumber: doctorData.phoneNumber,
        speciality: doctorData.speciality,
        address: doctorData.address,
      },
    );

    if (!updatedDoctor) {
      throw new HttpException(204, `Doctor not exists`);
    }

    return JSON.stringify({ data: updatedDoctor, message: 'updated' });
  }

  @Delete('/doctors/:id')
  @Authorized([UserRole.ADMIN])
  @OpenAPI({ summary: 'Delete a doctor' })
  async deleteDoctor(@Param('id') id: string) {
    const appointment = await this.appointmentService.findAppointment({ doctorId: id });

    if (appointment) {
      throw new HttpException(403, 'Cannot delete patient');
    }

    const deletedDoctor = await this.doctorService.deleteDoctor({ _id: id });

    if (!deletedDoctor) {
      throw new HttpException(204, 'Doctor not exists');
    }

    await this.userService.deleteUser({ _id: deletedDoctor.userId });

    return JSON.stringify({ data: deletedDoctor, message: 'deleted' });
  }
}
