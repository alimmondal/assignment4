import { Schema, model } from 'mongoose';
import { breed, category, label, location } from './cow.constant';
import { CowModel, ICow } from './cow.interface';

export const CowSchema = new Schema<ICow, CowModel>(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      enum: location,
      required: true,
    },
    breed: {
      type: String,
      enum: breed,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    label: {
      type: String,
      enum: label,
      // default: 'for sale',
    },
    category: {
      type: String,
      enum: category,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

export const Cow = model<ICow, CowModel>('Cow', CowSchema);
