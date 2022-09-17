import { authenticateUserWithToken } from '../../../middlewares';
import { ContextGraphql, User } from '../../../model';
import { addUser } from '../services/add-user';

const signUp = async (
  _parent: unknown,
  args: User,
  context: ContextGraphql
) => {
  console.log('request arrived for adding a user');
  const admin = await authenticateUserWithToken(context.token);
  const createdUser = await addUser(args, admin);
  console.log(createdUser, 'created User');
  return createdUser;
};

export { signUp };
