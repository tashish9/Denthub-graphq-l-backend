import { authenticateUserWithToken } from '../../../middlewares';
import { ContextGraphql, User } from '../../../model';

const currentUser = (
  _parent: unknown,
  _args: unknown,
  context: { token: string }
): Promise<User | undefined> => {
  console.log('Getting the current-user...');
  const token = context.token;
  const user = authenticateUserWithToken(token);
  return user;
};

export { currentUser };
