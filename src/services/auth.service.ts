import { Container, Service } from 'typedi';
import { LoginCredentialsDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/httpException';
import { User } from '@interfaces/users.interface';
import { UserModel } from '@models/users.model';
import { Document, FilterQuery } from 'mongoose';
import { UserService } from '@services/users.service';

@Service()
export class AuthService {
  userService = Container.get(UserService);

  public async login(credentials: LoginCredentialsDto): Promise<User & Document> {
    const filter: FilterQuery<User> = { email: credentials.email };

    const user: User & Document = await UserModel.findOne(filter);
    if (!user) throw new HttpException(404, `Account was not found`);

    const isValidPassword = await user.isValidPassword(credentials.password);

    if (!isValidPassword) throw new HttpException(404, 'Password is not matching');

    return user;
  }
}
