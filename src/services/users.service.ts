import { Service } from 'typedi';
import { CreateUserDto, UpdateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/httpException';
import { User } from '@interfaces/users.interface';
import { UserModel } from '@models/users.model';
import { Document, FilterQuery } from 'mongoose';
import { hashPassword } from '@utils/password';

@Service()
export class UserService {
  public async findUsers(filter: FilterQuery<User>): Promise<User[]> {
    return UserModel.find(filter);
  }

  public async findUser(filter: FilterQuery<User>): Promise<User> {
    const user: User = await UserModel.findOne(filter);

    if (!user) throw new HttpException(204, "User doesn't exist");

    return user;
  }

  public async createUser(userData: CreateUserDto): Promise<User & Document> {
    const hydratedUser = new UserModel({
      email: userData.email,
      password: userData.password,
      role: userData.role,
    });

    try {
      const user = await hydratedUser.save();

      return user;
    } catch (e) {
      if (e.code === 11000) throw new HttpException(409, `Email: ${userData.email} already exists`);
    }
  }

  public async updateUser(filter: FilterQuery<User>, userData: UpdateUserDto): Promise<User> {
    const user: User & Document = await UserModel.findOne(filter);

    if (!user) throw new HttpException(204, "User doesn't exist");

    user.password = await hashPassword(userData.password);

    return user.save();
  }

  public async deleteUser(filter: FilterQuery<User>): Promise<User> {
    const user: User & Document = await UserModel.findOneAndDelete(filter);

    if (!user) throw new HttpException(404, "User doesn't exist");

    return user;
  }
}
