import { Authorized, Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { Container } from 'typedi';
import { PatientService } from '@services/patients.service';
import { Patient } from '@interfaces/patients.interface';
import { User, UserRole } from '@interfaces/users.interface';
import { CreatePatientDto, UpdatePatientDto } from '@dtos/patients.dto';
import { UserService } from '@services/users.service';
import { AppointmentService } from '@services/appointments.service';
import { HttpException } from '@exceptions/httpException';

@Controller()
export class PatientController {
  public patientService = Container.get(PatientService);
  public userService = Container.get(UserService);
  public appointmentService = Container.get(AppointmentService);

  @Get('/patients')
  @Authorized([UserRole.ADMIN])
  @OpenAPI({ summary: 'Return a list of patients' })
  async getPatients() {
    const allPatients: Patient[] = await this.patientService.findPatients({});
    return JSON.stringify({ data: allPatients, message: 'findAll' });
  }

  @Post('/patients')
  @HttpCode(201)
  @Authorized([UserRole.ADMIN])
  @OpenAPI({ summary: 'Create a patient' })
  async createPatient(@Body() patientData: CreatePatientDto) {
    const createdUser: User = await this.userService.createUser({
      email: patientData.email,
      password: patientData.password,
      role: UserRole.PATIENT,
    });
    const createdPatient: Patient = await this.patientService.createPatient({
      ...patientData,
      userId: createdUser._id.toString(),
    });
    return JSON.stringify({ data: createdPatient, message: 'created' });
  }

  @Put('/patients/:id')
  @Authorized([UserRole.ADMIN])
  @OpenAPI({ summary: 'Update a patient' })
  async updatePatient(@Param('id') id: string, @Body() patientData: UpdatePatientDto) {
    const updatedPatient = await this.patientService.updatePatient(
      { _id: id },
      {
        firstName: patientData.firstName,
        lastName: patientData.lastName,
        gender: patientData.gender,
        birthdate: patientData.birthdate,
      },
    );

    if (!updatedPatient) {
      throw new HttpException(204, 'Patient not exists');
    }

    return JSON.stringify({ data: updatedPatient, message: 'updated' });
  }

  @Delete('/patients/:id')
  @Authorized([UserRole.ADMIN])
  @OpenAPI({ summary: 'Delete a patient' })
  async deletePatient(@Param('id') id: string) {
    const appointment = await this.appointmentService.findAppointment({ patientId: id });

    if (appointment) {
      throw new HttpException(403, 'Cannot delete patient');
    }

    const deletedPatient = await this.patientService.deletePatient({ _id: id });

    if (!deletedPatient) {
      throw new HttpException(204, 'Patient not exists');
    }

    await this.userService.deleteUser({ _id: deletedPatient._id });

    return JSON.stringify({ data: deletedPatient, message: 'deleted' });
  }
}
