import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateBuyerId, generateSellerId } from './user.utils';

const createUsersToDb = async (user: IUser): Promise<IUser | null> => {
  if (user.role === 'seller') {
    const id = await generateSellerId();
    user.id = id;
  } else {
    const id = await generateBuyerId();
    user.id = id;
  }

  const result = await User.create(user);
  return result;
};

const getAllUsers = async (): Promise<IUser[]> => {
  const result = await User.find({});

  return result;
};

const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findById({ _id: id });
  return result;
};

const updateUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const isExist = await User.findOne({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cow Id not found !');
  }

  const { name, ...userData } = payload;

  const updatedUserData: Partial<IUser> = { ...userData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IUser>; // `name.fisrtName`
      (updatedUserData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await User.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

const deleteCUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findByIdAndDelete(id).populate('user');
  return result;
};

export const UserService = {
  createUsersToDb,
  getAllUsers,
  updateUser,
  deleteCUser,
  getSingleUser,
};
