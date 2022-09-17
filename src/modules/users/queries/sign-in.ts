import { ContextGraphql, User } from '../../../model';
import { login } from '../services/login';
import { CONSTANTS } from '../../../config';

const {
  PUB_SUB_VARS: { SIGNIN },
} = CONSTANTS;

const signInQuery = async (
  _parent: unknown,
  args: User,
  context: ContextGraphql
) => {
  console.log('Trying to sign In...');
  const { token, user } = await login(args);
  console.log('Signed In successfully! Returning the JWT token...');
  context.pubsub.publish(SIGNIN, {
    signIn: {
      username: user.username,
      role: user.role,
    },
  });
  return {
    authToken: token,
    role: user.role,
  };
};

// happy and error path
// error-> creatre scenarios where it will throw error
// using ESlint

// TODO  add a readme.md (mention steps to setup and run the project)
// add nodemon.json

// TODO  try to convert project to js (build)
// try with tsc first
export { signInQuery };
