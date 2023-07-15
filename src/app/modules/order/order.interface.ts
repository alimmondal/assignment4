// transactionTypes.ts
import { Model, Types } from 'mongoose';
import { IUser } from '../user/user.interface';

export type IOrder = {
  buyerId?: Types.ObjectId | IUser;
  sellerId?: Types.ObjectId | IUser;
  IdOfCow?: string;
  price?: number;
};

export type OrderModel = Model<IOrder, Record<string, unknown>>;
