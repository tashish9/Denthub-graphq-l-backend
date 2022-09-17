import { findUserByID } from './find-user-by-id';
import * as userDbFuncs from '../../../db/controllers/users';
import mongoose from 'mongoose';

const fakeFindUser = jest.spyOn(userDbFuncs, 'findUser');

describe('testing findUserById service function', () => {
  it('should run smoothly returning a legit user', async () => {
    const sampleInputUser = {
      _id: new mongoose.Types.ObjectId(),
      username: 'a-sample-user',
    };
    fakeFindUser.mockResolvedValueOnce(sampleInputUser);
    const user = await findUserByID(sampleInputUser._id);
    expect(user._id.toString()).toBe(sampleInputUser._id.toString());
  });

  it('should throw error coz invalid id', async () => {
    try {
      const id = new mongoose.Types.ObjectId();
      fakeFindUser.mockResolvedValueOnce(null);
      const user = await findUserByID(id);
    } catch (error) {
      expect(error.message).toBe("User doesn't exist");
    }
  });

  it('should throw error coz mongodb func fails', async () => {
    try {
      const id = new mongoose.Types.ObjectId();
      fakeFindUser.mockImplementationOnce(() => {
        throw new Error('Connection Timed Out');
      });
      const user = await findUserByID(id);
    } catch (error) {
      expect(error.message).toBe('Connection Timed Out');
    }
  });
});
