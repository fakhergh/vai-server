import { IsString, IsNotEmpty, MaxLength, IsEnum } from 'class-validator';
import { IsISODate, IsObjectId } from '@utils/validator';
import { AppointmentStatus } from '@interfaces/appointments.interface';

export class CreateAppointmentDto {
  @IsObjectId()
  @IsNotEmpty()
  doctorId: string;

  @IsObjectId()
  patientId: string;

  @IsString()
  @MaxLength(300)
  description: string;

  @IsISODate()
  @IsNotEmpty()
  date: Date;
}

export class UpdateAppointmentDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(300)
  public description: string;

  @IsISODate()
  @IsNotEmpty()
  public date: Date;

  @IsEnum(AppointmentStatus)
  @IsNotEmpty()
  public status: AppointmentStatus;
}
