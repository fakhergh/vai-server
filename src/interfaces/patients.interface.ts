import { Types } from 'mongoose';

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export interface Patient {
  _id?: Types.ObjectId;
  firstName: string;
  lastName: string;
  gender: Gender;
  birthdate: Date;
  userId: Types.ObjectId;
}

export interface CreatePatientData {
  firstName: string;
  lastName: string;
  birthdate: Date;
  gender: Gender;
  userId: string;
}

export interface UpdatePatientData {
  firstName: string;
  lastName: string;
  birthdate: Date;
  gender: Gender;
}
