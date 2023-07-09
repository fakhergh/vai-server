import { Types } from 'mongoose';

export interface Doctor {
  _id?: Types.ObjectId;
  firstName: string;
  lastName: string;
  speciality: string;
  phoneNumber: string;
  address: string;
  userId: Types.ObjectId;
}

export interface CreateDoctorData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  speciality: string;
  address: string;
  userId: string;
}

export interface UpdateDoctorData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  speciality: string;
  address: string;
}
