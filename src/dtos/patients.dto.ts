import { IsEmail, IsEnum, IsISO8601, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { Gender } from '@interfaces/patients.interface';

export class UpdatePatientDto {
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @MinLength(3)
  @MaxLength(20)
  @IsNotEmpty()
  lastName: string;

  @IsEnum(Gender)
  @IsNotEmpty()
  gender: Gender;

  @IsNotEmpty()
  @IsISO8601()
  birthdate: Date;
}

export class CreatePatientDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(32)
  password: string;

  @IsString()
  @MinLength(3)
  @MaxLength(20)
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @MinLength(3)
  @MaxLength(20)
  @IsNotEmpty()
  lastName: string;

  @IsEnum(Gender)
  @IsNotEmpty()
  gender: Gender;

  @IsNotEmpty()
  @IsISO8601()
  birthdate: Date;
}
