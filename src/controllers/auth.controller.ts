import { Body, Controller, HttpCode, Post } from 'routing-controllers';
import { Container } from 'typedi';
import { LoginCredentialsDto } from '@dtos/users.dto';
import { UserRole } from '@interfaces/users.interface';
import { AuthService } from '@services/auth.service';
import { CreatePatientDto } from '@dtos/patients.dto';
import { TokenPayload } from '@interfaces/auth.interface';
import { generate } from '@utils/jwt';
import { UserService } from '@services/users.service';
import { PatientService } from '@services/patients.service';

function createToken(_id: string, role: UserRole) {
  const payload: TokenPayload = { _id, role };
  return generate(payload);
}

@Controller()
export class AuthController {
  public authService = Container.get(AuthService);
  public userService = Container.get(UserService);
  public patientService = Container.get(PatientService);

  @Post('/register')
  @HttpCode(201)
  async register(@Body() patientData: CreatePatientDto) {
    const user = await this.userService.createUser({
      email: patientData.email,
      password: patientData.password,
      role: UserRole.PATIENT,
    });

    await this.patientService.createPatient({
      firstName: patientData.firstName,
      lastName: patientData.lastName,
      birthdate: patientData.birthdate,
      gender: patientData.gender,
      userId: user._id,
    });
    const token = createToken(user._id, user.role);
    return JSON.stringify({ data: { token, user }, message: 'register' });
  }

  @Post('/login')
  async logIn(@Body() credentials: LoginCredentialsDto) {
    const user = await this.authService.login(credentials);
    const token = createToken(user._id, user.role);
    return JSON.stringify({ data: { token, user }, message: 'login' });
  }
}
