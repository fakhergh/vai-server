import { UserModel } from '@models/users.model';
import { Action } from 'routing-controllers';
import { decode } from '@utils/jwt';

export async function authorizationChecker(action: Action, roles: string[]) {
  // here you can use request/response objects from action
  // also if decorator defines roles it needs to access the action
  // you can use them to provide granular access check
  // checker must return either boolean (true or false)
  // either promise that resolves a boolean value
  // demo code:
  const token = action.request.headers['authorization'];

  const { _id } = await decode(token);

  const user = await UserModel.findById(_id);

  if (user && !roles.length) return true;
  if (user && roles.includes(user.role)) return true;

  return false;
}
