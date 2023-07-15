import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../../config';
import { role } from './user.constant';
import { IUser, UserModel } from './user.interface';

const UserSchema = new Schema<IUser, UserModel>(
  {
    id: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: role,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      firstName: {
        type: String,
        required: true,
        unique: true,
      },
      lastName: {
        type: String,
        required: true,
        unique: true,
      },
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    income: {
      type: Number,
      required: true,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

UserSchema.statics.isUserExist = async function (
  phoneNumber: string
): Promise<Pick<
  IUser,
  'id' | 'password' | 'phoneNumber' | 'role' | 'needsPasswordChange'
> | null> {
  return await User.findOne(
    { phoneNumber },
    { id: 1, password: 1, phoneNumber: 1, role: 1, needsPasswordChange: 1 }
  );
};

UserSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

// User.create() / user.save()
UserSchema.pre('save', async function (next) {
  // hashing user password
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

export const User = model<IUser, UserModel>('User', UserSchema);
