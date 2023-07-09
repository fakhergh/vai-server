import { getModelForClass, modelOptions, pre, prop } from '@typegoose/typegoose';
import { User, UserRole } from '@interfaces/users.interface';
import { compare } from 'bcryptjs';
import { hashPassword } from '@utils/password';

@modelOptions({
  schemaOptions: {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
      },
    },
    timestamps: true,
  },
})
@pre<User>('save', async function (next) {
  if (this.isNew && this.isModified('password')) {
    this.password = await hashPassword(this.password);
  }
  next();
})
export class UserSchema implements User {
  @prop({ type: String, unique: true, required: true, trim: true, lowercase: true })
  email: string;

  @prop({ type: String, required: true })
  password: string;

  @prop({ type: String, required: true })
  role: UserRole;

  isValidPassword(password: string): Promise<boolean> {
    return compare(password, this.password);
  }
}

export const UserModel = getModelForClass(UserSchema, { options: { customName: 'users' } });
