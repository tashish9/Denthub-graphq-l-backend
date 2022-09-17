// 1 . recieve email , password from req
// 2 . look for email in db
// 3. compare encrypted password
// 4. create & return token (verified)

import { login } from './login'; // main
import bcrypt from 'bcrypt'; // mock
import * as auth from '../../../middlewares'; // mock
import * as userDbFuncs from '../../../db/controllers/users';
import { User } from '../../../model';

const fakeCreateToken = jest.spyOn(auth, 'createToken');
const fakeFindUser = jest.spyOn(userDbFuncs, 'findUser');
const fakeCompare = jest.spyOn(bcrypt, 'compare');

describe('testing login service function', () => {
  it('should run smoothly returning a jwt token', async () => {
    const sampleInput = {
      email: 'sampleemail',
      password: 'password',
    };
    const token = 'token';
    fakeFindUser.mockResolvedValueOnce(sampleInput);
    fakeCreateToken.mockReturnValueOnce(token);
    const { token: outputToken } = await login(sampleInput as User);
    expect(outputToken).toBe(token);
  }); // happy path

  it('should throw error coz invalid email', async () => {
    try {
      fakeFindUser.mockImplementationOnce(() => {
        return null;
      });
      const loginInfo = await login({
        email: 'randommail',
        password: 'password',
      } as User);
    } catch (error) {
      expect(error.message).toBe('Incorrect username/password');
    }
  }); // error 1

  it('should throw error coz invalid password', async () => {
    try {
      const sampleInput = {
        email: 'arandomemail',
        password: 'password',
      };
      fakeFindUser.mockResolvedValueOnce(sampleInput);
      const loginInfo = await login(sampleInput as User);
    } catch (error) {
      expect(error.message).toBe('Incorrect username/password');
    }
  }); // error 2

  it('should throw error when mongodb func fails', async () => {
    fakeCompare.mockClear();
    try {
      const sampleInput = {
        email: 'justafakeemail',
        password: 'password',
      };
      fakeFindUser.mockImplementation(() => {
        throw new Error('connection timed out');
      });
      const createdUser = await login(sampleInput as User);
    } catch (error) {
      expect(error.message).toBe('connection timed out');
      expect(fakeCompare).toHaveBeenCalledTimes(0);
    }
  });

  // error path cases
  // 1. user doesn't exist  -> wrong or invalid email
  // 2. wrong password -> doesn't match with stored encrypted password
  // 3. mongodb error
});

// FIXME resolved value vs return value
