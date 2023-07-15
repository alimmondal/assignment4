/* eslint-disable no-console */

import httpStatus from 'http-status';
import mongoose from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { ICow } from '../cow/cow.interface';
import { Cow } from '../cow/cow.model';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { IOrder } from './order.interface';
import { Order } from './order.model';

const createOrder = async (
  cowId: ICow,
  buyerId: IUser
): Promise<IOrder | null> => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const cow = await Cow.findById(cowId).session(session);
    console.log('CowId', cow?.price);
    // Check if the cow is still available for sale
    if (!cow || cow.label !== 'for sale') {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Cow not available');
    }

    const user = await User.findById(buyerId).session(session);
    console.log(user);

    if (!user) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid buyer ID.');
    }

    // Check if the buyer has enough money to buy the cow
    if (user.budget < cow.price) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Insufficient funds to buy the cow'
      );
    }

    // Deduct the cow's price from the buyer's budget and update the buyer's document
    user.budget -= cow.price;
    await user.save({ session });

    // Update the cow's status to 'sold out'
    cow.label = 'sold out';
    await cow.save({ session });

    // const { price, _id } = cow;
    // Add an entry to the orders collection
    const order = await Order.create(
      [
        {
          IdOfCow: cow._id,
          buyerId: user._id,
          sellerId: cow.user,
          price: cow.price,
        },
      ],
      { session }
    );

    // Transfer money from the buyer's account to the seller's account
    const seller = await User.findById(cow.user).session(session);
    console.log('Seller', seller);

    if (!seller) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid buyer ID.');
    }

    seller.income += cow.price;
    await seller.save({ session });

    await session.commitTransaction();
    session.endSession();

    return order ? order[0] : null;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

const getAllOrders = async (): Promise<IOrder[]> => {
  const result = await Order.find({});
  return result;
};

export const OrderService = {
  createOrder,
  getAllOrders,
};
