import { prop, getModelForClass, modelOptions, pre } from '@typegoose/typegoose';
import { Doctor } from '@interfaces/doctors.interface';
import { Types } from 'mongoose';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
class DoctorSchema implements Doctor {
  @prop({ type: Types.ObjectId })
  userId: Types.ObjectId;

  @prop({ type: String, required: true })
  firstName: string;

  @prop({ type: String, required: true })
  lastName: string;

  @prop({ type: String, required: true })
  phoneNumber: string;

  @prop({ type: String, required: true })
  speciality: string;

  @prop({ type: String, required: true })
  address: string;
}

export const DoctorModel = getModelForClass(DoctorSchema, { options: { customName: 'doctors' } });
