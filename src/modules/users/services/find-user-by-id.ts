import mongoose from 'mongoose';
import { findUser } from '../../../db/controllers/users';
import { throwNotFoundError } from '../../../error';
import { User } from '../../../model/user';

const findUserByID = async (_id: mongoose.Types.ObjectId): Promise<User> => {
  const user = await findUser({ _id });
  if (!user) {
    throwNotFoundError("User doesn't exist");
  }
  return user;
};

export { findUserByID };
