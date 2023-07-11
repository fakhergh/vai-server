import { Service } from 'typedi';
import { CreatePatientData, Patient, UpdatePatientData } from '@interfaces/patients.interface';
import { PatientModel } from '@models/patients.model';
import { FilterQuery } from 'mongoose';

@Service()
export class PatientService {
  async findPatients(filter: FilterQuery<Patient>): Promise<Array<Patient>> {
    return PatientModel.find(filter);
  }

  async createPatient(patientData: CreatePatientData): Promise<Patient> {
    const hydratedPatient = new PatientModel({
      firstName: patientData.firstName,
      lastName: patientData.lastName,
      gender: patientData.gender,
      birthdate: patientData.birthdate,
      userId: patientData.userId,
    });

    return hydratedPatient.save();
  }

  async updatePatient(filter: FilterQuery<Patient>, patientData: UpdatePatientData): Promise<Patient> {
    return PatientModel.findOne(filter, { $set: patientData });
  }

  async deletePatient(filter: FilterQuery<Patient>): Promise<Patient> {
    return PatientModel.findOneAndDelete(filter);
  }
}
