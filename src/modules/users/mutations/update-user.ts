import mongoose from 'mongoose';
import { authenticateUserWithToken } from '../../../middlewares';
import { ContextGraphql, User } from '../../../model';
import { updateUserService } from '../services/update-user';

const updateUser = async (
  _parent: unknown,
  args: User,
  context: ContextGraphql
): Promise<User | undefined> => {
  console.log('Trying to update user...');
  const currentUser = await authenticateUserWithToken(context.token);
  const { _id, ...updateInfo } = args;
  const updatedUser = await updateUserService(
    _id,
    updateInfo as unknown as User,
    currentUser
  );
  return updatedUser;
};
export { updateUser };
