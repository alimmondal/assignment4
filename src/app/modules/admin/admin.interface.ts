/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { ENUM_USER_ROLE } from '../../../enums/user';

export type UserName = {
  firstName: string;
  lastName: string;
  middleName: string;
};

export type IAdmin = {
  id: string;
  password: string;
  role: 'seller' | 'buyer' | 'admin';
  name: UserName;
  phoneNumber: string;
  address: string;
  needsPasswordChange: true | false;
};

export type AdminModel = {
  isAdminExist(
    phoneNumber: string
  ): Promise<
    Pick<
      IAdmin,
      'id' | 'phoneNumber' | 'password' | 'role' | 'needsPasswordChange'
    >
  >;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IAdmin>;

// export type AdminModel = Model<IAdmin, Record<string, unknown>>;

export type IAdminFilters = {
  searchTerm?: string;
  id?: string;
  role?: string;
  address?: string;
  phoneNumber?: string;
  name?: string;
};

export type IAdminLogin = {
  id?: string;
  password: string;
  phoneNumber: string;
};

export type IAdminLoginResponse = {
  accessToken: string;
  refreshToken?: string;
  needsPasswordChange: boolean;
};

// export type IRefreshTokenResponse = {
//   accessToken: string;
// };

export type IVerifiedLoginAdmin = {
  userId: string;
  role: ENUM_USER_ROLE;
};
