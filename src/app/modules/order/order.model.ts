import { Schema, model } from 'mongoose';
import { IOrder, OrderModel } from './order.interface';

const OrderSchema = new Schema<IOrder, OrderModel>(
  {
    buyerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    IdOfCow: { type: String },
    price: { type: Number },
  },
  {
    timestamps: true,
  }
);

export const Order = model<IOrder, OrderModel>('Order', OrderSchema);
