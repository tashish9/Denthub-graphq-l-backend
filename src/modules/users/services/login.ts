import { findUser } from '../../../db/controllers/users';
import bcrypt from 'bcrypt';
import { createToken } from '../../../middlewares';
import { User } from '../../../model';
import { throwBadRequestError, throwNotFoundError } from '../../../error';

const login = async (userFromRequest: User) => {
  const { email, password } = userFromRequest;
  const user: User = await findUser({ email: email });
  if (!user) {
    throwBadRequestError('Incorrect username/password');
  }
  const passwordCheck = await bcrypt.compare(password, user.password);
  console.log(passwordCheck, 'passwordCheck');
  if (passwordCheck === false) {
    throwBadRequestError('Incorrect username/password');
  }
  const token = createToken({ _id: user._id, username: user.username });
  return { token, user };
};

export { login };
