import { getUsersList } from '../services/get-users-list';
import { ContextGraphql, User } from '../../../model';
import { authenticateUserWithToken } from '../../../middlewares';

const users = async (
  _parent: unknown,
  args: any,
  context: ContextGraphql
): Promise<User[] | undefined> => {
  console.log('Getting all the Users....');
  const user = await authenticateUserWithToken(context.token);
  const usersList = await getUsersList(user, args);
  return usersList;
};

export { users };
