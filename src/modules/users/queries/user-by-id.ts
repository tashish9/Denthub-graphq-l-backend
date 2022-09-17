import mongoose from 'mongoose';
import { authenticateUserWithToken } from '../../../middlewares';
import { findUserByID } from '../services/find-user-by-id';

const userByID = async (
  _parent: unknown,
  args: { _id: mongoose.Types.ObjectId },
  context: { token: string }
) => {
  await authenticateUserWithToken(context.token);
  const foundUser = findUserByID(args._id);
  return foundUser;
};

export { userByID };
