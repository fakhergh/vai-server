import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { Gender, Patient } from '@interfaces/patients.interface';
import { Types } from 'mongoose';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class PatientSchema implements Patient {
  @prop({ type: Types.ObjectId })
  userId: Types.ObjectId;

  @prop({ type: String, required: true })
  firstName: string;

  @prop({ type: String, required: true })
  lastName: string;

  @prop({ type: String, required: true })
  gender: Gender;

  @prop({ type: Date, required: true })
  birthdate: Date;
}

export const PatientModel = getModelForClass(PatientSchema, { options: { customName: 'patients' } });
