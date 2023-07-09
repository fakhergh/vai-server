import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength, IsEnum } from 'class-validator';
import { UserRole } from '@interfaces/users.interface';

export class LoginCredentialsDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(32)
  password: string;
}

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(32)
  password: string;
}

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(32)
  password: string;

  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole;
}
