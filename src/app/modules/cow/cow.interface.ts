import { Document, Model, PopulatedDoc } from 'mongoose';
import { IUser } from '../user/user.interface';

export type ICow = {
  name: string;
  age: number;
  price: number;
  location:
    | 'Dhaka'
    | 'Chitagong'
    | 'Rangpur'
    | 'Rajshahi'
    | 'Mymenshing'
    | 'Khulna'
    | 'Barishal'
    | 'Comilla'
    | 'Sylhet';
  breed:
    | 'Brahman'
    | 'Nellore'
    | 'Sahi'
    | 'Gir'
    | 'Indigenous'
    | 'Tharparkar'
    | 'Kankrej';
  weight: number;
  label?: 'for sale' | 'sold out';
  category: 'Dairy' | 'Beef' | 'Dual Purpose';
  // sellerId: Types.ObjectId | IUser;
  user: PopulatedDoc<IUser & Document>;
};

export type CowModel = Model<ICow, Record<string, unknown>>;

export type ICowFilters = {
  searchTerm?: string;
  breed?: string;
  category?: string;
  label?: string;
  location?: string;
  name?: string;
};
