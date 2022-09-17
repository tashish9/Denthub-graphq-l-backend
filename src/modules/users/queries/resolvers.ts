import { users } from './users';
import { currentUser } from './current-user';
import { userByID } from './user-by-id';
import { signInQuery } from './sign-in';

const usersQueriesResolver = {
  Query: {
    users,
    currentUser,
    userByID,
    signIn: signInQuery,
  },
};

export { usersQueriesResolver };
