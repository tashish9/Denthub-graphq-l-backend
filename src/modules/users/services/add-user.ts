import { createUser, findUser } from '../../../db/controllers/users';
import { User } from '../../../model/user';
import bcrypt from 'bcrypt';
import { throwBadRequestError } from '../../../error';
import { CONSTANTS } from '../../../config';

const addUser = async (userData: User, admin: User): Promise<User> => {
  if (
    admin.role === 'TECHNICIAN_USER' ||
    admin.role === 'DENTIST_USER' ||
    (admin.role === 'TECHNICIAN_ADMIN' && userData.type !== 'TECHNICIAN') ||
    (admin.role === 'DENTIST_ADMIN' && userData.type !== 'DENTIST')
  ) {
    throwBadRequestError('Access Denied');
  }

  const plainPassword = CONSTANTS.COMMON_PASSWORD as string;
  const { email } = userData;
  const user = await findUser({ email: email });
  if (user) {
    throwBadRequestError('User Already Exists');
  }
  const password = await bcrypt.hash(plainPassword, 10);
  const data = Object.assign({}, userData, {
    type: userData.role.split('_')[0],
    created: {
      at: new Date(),
      by: admin._id,
    },
    active: true,
    password,
  });
  return createUser(data);
};

// someone should be already logged in to sign up?
// how the first guy's gonna signup?
// Try to keep the func pure

export { addUser };
// TODO go through es lint doc && extend with prettier
