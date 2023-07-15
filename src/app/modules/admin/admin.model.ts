import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../../config';
import { role } from '../user/user.constant';
import { AdminModel, IAdmin } from './admin.interface';

const AdminSchema = new Schema<IAdmin, AdminModel>(
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
        // unique: true,
      },
      lastName: {
        type: String,
        required: true,
        // unique: true,
      },
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    needsPasswordChange: {
      type: Boolean,
      default: false,
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

AdminSchema.statics.isAdminExist = async function (
  phoneNumber: string
): Promise<Pick<
  IAdmin,
  'id' | 'phoneNumber' | 'password' | 'role' | 'needsPasswordChange'
> | null> {
  return await Admin.findOne(
    { phoneNumber },
    { id: 1, phoneNumber: 1, password: 1, role: 1, needsPasswordChange: 1 }
  );
};

AdminSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

// User.create() / user.save()
AdminSchema.pre('save', async function (next) {
  // hashing user password
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

export const Admin = model<IAdmin, AdminModel>('Admin', AdminSchema);
