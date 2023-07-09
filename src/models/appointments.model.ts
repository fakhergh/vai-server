import { prop, getModelForClass, index, modelOptions } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { Appointment, AppointmentStatus } from '@interfaces/appointments.interface';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
@index({ doctorId: 1, date: 1 }, { unique: true })
class AppointmentSchema implements Appointment {
  @prop({ type: Types.ObjectId, required: true })
  doctorId: Types.ObjectId;

  @prop({ type: Types.ObjectId, required: true })
  patientId: Types.ObjectId;

  @prop({ type: String })
  description: string;

  @prop({ type: Date, required: true })
  date: Date;

  @prop({ type: String, default: AppointmentStatus.PENDING })
  status: AppointmentStatus;
}

export const AppointmentModel = getModelForClass(AppointmentSchema, { options: { customName: 'appointments' } });
