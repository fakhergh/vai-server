import { Types } from 'mongoose';

export enum UserRole {
  ADMIN = 'ADMIN',
  DOCTOR = 'DOCTOR',
  PATIENT = 'PATIENT',
}

export interface User {
  _id?: Types.ObjectId;
  email: string;
  password: string;
  role: UserRole;
  isValidPassword: (password: string) => Promise<boolean>;
}
