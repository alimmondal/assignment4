/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

type UserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type IUser = {
  id: string;
  password: string;
  role: 'seller' | 'buyer';
  name: UserName;
  phoneNumber: string;
  address: string;
  budget: number;
  income: number;
  needsPasswordChange: true | false;
};

export type UserModel = {
  isUserExist(
    phoneNumber: string
  ): Promise<
    Pick<
      IUser,
      'id' | 'phoneNumber' | 'password' | 'role' | 'needsPasswordChange'
    >
  >;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;

// export type UserModel = Model<IUser, Record<string, unknown>>;
