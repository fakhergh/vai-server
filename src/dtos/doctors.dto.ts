import { IsNotEmpty, IsEmail, IsString, MaxLength, MinLength, IsPhoneNumber } from 'class-validator';

export class UpdateDoctorDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(30)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(30)
  lastName: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  speciality: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  address: string;
}

export class CreateDoctorDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(30)
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(30)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(30)
  lastName: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  speciality: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  address: string;
}
