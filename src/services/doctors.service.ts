import { Service } from 'typedi';
import { CreateDoctorData, Doctor, UpdateDoctorData } from '@interfaces/doctors.interface';
import { DoctorModel } from '@models/doctors.model';
import { FilterQuery } from 'mongoose';
import { HttpException } from '@exceptions/httpException';
import { AppointmentModel } from '@models/appointments.model';
import { UserModel } from '@models/users.model';

@Service()
export class DoctorService {
  async findDoctors(filter: FilterQuery<Doctor>): Promise<Array<Doctor>> {
    return DoctorModel.find(filter);
  }

  async createDoctor(doctorData: CreateDoctorData): Promise<Doctor> {
    const hydratedDoctor = new DoctorModel({
      firstName: doctorData.firstName,
      lastName: doctorData.firstName,
      phoneNumber: doctorData.phoneNumber,
      speciality: doctorData.speciality,
      address: doctorData.address,
      userId: doctorData.userId,
    });

    return hydratedDoctor.save();
  }

  async updateDoctor(filter: FilterQuery<Doctor>, doctorData: UpdateDoctorData): Promise<Doctor> {
    const doctor = await DoctorModel.findOne(filter);

    if (!doctor) {
      throw new HttpException(204, `Doctor not exists`);
    }

    doctor.firstName = doctorData.firstName;
    doctor.lastName = doctorData.lastName;
    doctor.phoneNumber = doctorData.phoneNumber;
    doctor.speciality = doctorData.speciality;
    doctor.address = doctorData.address;

    return doctor.save();
  }

  async deleteDoctor(filter: FilterQuery<Doctor>): Promise<Doctor> {
    return DoctorModel.findOneAndDelete(filter);
  }
}
