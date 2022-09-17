import { updateUser } from './update-user';
import { signUp } from './sign-up';

const usersMutationsResolver = {
  Mutation: {
    updateUser,
    signUp,
  },
}

export {usersMutationsResolver};