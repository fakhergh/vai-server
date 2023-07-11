import { Service } from 'typedi';
import { CreateDoctorData, Doctor, UpdateDoctorData } from '@interfaces/doctors.interface';
import { DoctorModel } from '@models/doctors.model';
import { FilterQuery } from 'mongoose';

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
    return DoctorModel.findOneAndUpdate(filter, { $set: doctorData });
  }

  async deleteDoctor(filter: FilterQuery<Doctor>): Promise<Doctor> {
    return DoctorModel.findOneAndDelete(filter);
  }
}
