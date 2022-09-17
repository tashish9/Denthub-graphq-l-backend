import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { CONSTANTS } from '../config';
import { throwUnAuthenticatedError } from '../error';
import { User } from '../model';
import { findUser } from '../db/controllers/users';
const { SECRET } = CONSTANTS;
// 1. Create token
// 2. Authorise the token on each required request

const createToken = (payload: JwtPayload): string => {
  const tokenPayload = Object.assign({ time: new Date().getTime() }, payload);
  const x = sign(tokenPayload, SECRET, { expiresIn: '7 days' }); // returning a legit jwt token
  return x;
};

const authenticateUserWithToken = async (auth: string) => {
  console.log('Trying to authenticate...');
  if (!auth) {
    throwUnAuthenticatedError('Token Error');
  }
  const authParts = auth.split(' ');
  if (authParts.length < 2) {
    throwUnAuthenticatedError('Token Error');
  }
  const [scheme, token] = authParts;
  if (scheme !== 'JWT') {
    throwUnAuthenticatedError('Token Error');
  }
  const userPayload: JwtPayload | string = await verify(token, SECRET);
  const id = (userPayload as JwtPayload)._id;
  const user: User = await findUser({ _id: id });
  if (!user) {
    throwUnAuthenticatedError('User does not exist');
  }
  console.log(`Authentication Successful!! ${user.username} -> ${user.role} `);
  return user;
};

export { createToken, authenticateUserWithToken };

// TODO mongodump / mongoexport && later  mongorestore / mongoimport
