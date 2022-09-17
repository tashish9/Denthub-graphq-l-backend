/* eslint-disable @typescript-eslint/ban-types */
import { authenticateUserWithToken, createToken } from './auth';
import * as userDbFuncs from '../db/controllers/users';
import mongoose from 'mongoose';

// FIXME think about each line if it has even slightest possibility of throwing error

// methods for mocking the functions using jest

// method 1 -> sort of global mock. good if u gonna use same mock throughout file
// jest.mock('../db/controllers/users.ts', () => {
//   return {
//     findUser: jest.fn(() => {
//       return samplePayload;
//     }),
//   };
// });

// method 2 -> good if u directly want a value from mock func
// const fakeFindUser = jest.spyOn(userDbFuncs, 'findUser');
// fakeFindUser.mockResolvedValueOnce(samplePayload)

// method 3 -> if u wanna play around with mock implementation
// const mock = jest.spyOn(FooFactory, 'foo');  // spy on foo
// mock.mockImplementation((arg: string) => 'TEST');  // replace implementation

const fakeFindUser = jest.spyOn(userDbFuncs, 'findUser');
describe('testing authenticatuserwithtoken', () => {
  it('should return a legit user', async () => {
    const samplePayload = {
      _id: new mongoose.Types.ObjectId(),
      username: 'test-user',
    };
    fakeFindUser.mockImplementationOnce(() => {
      return samplePayload as unknown as mongoose.Query<any, any, {}, any>;
    });
    // fakeFindUser.mockResolvedValueOnce(samplePayload);
    const token = await createToken(samplePayload);
    const user = await authenticateUserWithToken(`JWT ${token}`);
    expect(user._id.toString()).toBe(samplePayload._id.toString());
  }); // happy path case

  it('should throw an error with no token ', async () => {
    try {
      const token = '';
      const user = await authenticateUserWithToken(token);
    } catch (error) {
      expect(error.message).toBe('Token Error');
    }
  }); // error1

  it('should throw error with absent scheme/token', async () => {
    try {
      const token = 'a-token';
      const user = await authenticateUserWithToken(token);
    } catch (error) {
      expect(error.message).toBe('Token Error');
    }
  }); // error2

  it('should throw error with invalid scheme', async () => {
    try {
      const token = 'a-token';
      const user = await authenticateUserWithToken(`invalid_scheme ${token}`);
    } catch (error) {
      expect(error.message).toBe('Token Error');
    }
  }); // error3

  it('should throw error because invalid token', async () => {
    try {
      const token = 'an-invalid-token';
      const user = await authenticateUserWithToken(`JWT ${token}`);
    } catch (error) {
      // console.log(error.message);
      expect(error.message).toBe('jwt malformed');
    }
  }); // error4

  it('should throw error because invalid id', async () => {
    try {
      fakeFindUser.mockResolvedValueOnce(null);
      const token = await createToken({ _id: 7 });
      const user = await authenticateUserWithToken(`JWT ${token}`);
    } catch (error) {
      expect(error.message).toBe('User does not exist');
    } // error5
  });
});
