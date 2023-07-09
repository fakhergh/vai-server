import { User, UserRole } from '@interfaces/users.interface';
import { Patient } from '@interfaces/patients.interface';
import { Doctor } from '@interfaces/doctors.interface';

export interface TokenPayload {
  _id: string;
  role: UserRole;
}

export interface CurrentUserInfo {
  user: User;
  patient?: Patient;
  doctor?: Doctor;
}
