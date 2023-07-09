import { Action } from 'routing-controllers';
import { UserModel } from '@models/users.model';
import { decode } from '@utils/jwt';
import { UserRole } from '@interfaces/users.interface';
import { DoctorModel } from '@models/doctors.model';
import { PatientModel } from '@models/patients.model';
import { CurrentUserInfo } from '@interfaces/auth.interface';

export async function currentUserChecker(action: Action) {
  // here you can use request/response objects from action
  // you need to provide a user object that will be injected in controller actions
  // demo code:
  const token = action.request.headers['authorization'];
  const { _id } = await decode(token);

  const user = await UserModel.findById(_id);

  const currentUser: CurrentUserInfo = {
    user,
  };

  switch (user.role) {
    case UserRole.DOCTOR:
      const doctor = await DoctorModel.findOne({ userId: user._id });
      currentUser.doctor = doctor;
      break;
    case UserRole.PATIENT:
      const patient = await PatientModel.findOne({ userId: user._id });
      currentUser.patient = patient;
      break;
  }

  return currentUser;
}
