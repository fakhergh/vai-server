import { Types } from 'mongoose';

export enum AppointmentStatus {
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
  APPROVED = 'APPROVED',
  COMPLETED = 'COMPLETED',
}

export interface Appointment {
  doctorId: Types.ObjectId;
  patientId: Types.ObjectId;
  description: string;
  date: Date;
  status: AppointmentStatus;
}

export interface CreateAppointmentData {
  doctorId: string;
  patientId: string;
  description: string;
  date: Date;
}

export interface UpdateAppointmentData {
  description: string;
  date: Date;
  status: AppointmentStatus;
}
