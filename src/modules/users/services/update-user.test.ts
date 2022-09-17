import { updateUserService } from './update-user';
import * as userDbFuncs from '../../../db/controllers/users';
import mongoose from 'mongoose';
import { User } from '../../../model';

const fakeFindOneAndUpdateUser = jest.spyOn(
  userDbFuncs,
  'findOneAndUpdateUser'
);

const sampleInput = {
  _id: new mongoose.Types.ObjectId(),
  updateInfo: {
    phoneNumber: '78787',
  },
  admin: {
    _id: new mongoose.Types.ObjectId(),
    username: 'sample-input-user',
  },
};

describe('testing update user service function', () => {
  it('should update and return updated user', async () => {
    fakeFindOneAndUpdateUser.mockResolvedValueOnce(sampleInput.admin);
    const user = await updateUserService(
      sampleInput._id,
      sampleInput.updateInfo as User,
      sampleInput.admin as User
    );
    expect(user._id.toString()).toBe(sampleInput.admin._id.toString());
  });

  it('should throw error coz invalid/no id', async () => {
    fakeFindOneAndUpdateUser.mockClear();
    try {
      fakeFindOneAndUpdateUser.mockResolvedValueOnce(null);
      const user = await updateUserService(
        sampleInput._id,
        sampleInput.updateInfo as User,
        sampleInput.admin as User
      );
    } catch (error) {
      expect(error.message).toBe('User does not exist');
    }
  });

  it('should throw error coz mongodb func time out', async () => {
    fakeFindOneAndUpdateUser.mockClear();
    try {
      fakeFindOneAndUpdateUser.mockImplementationOnce(() => {
        throw new Error('Connection timed out');
      });
      const user = await updateUserService(
        sampleInput._id,
        sampleInput.updateInfo as User,
        sampleInput.admin as User
      );
    } catch (error) {
      expect(error.message).toBe('Connection timed out');
    }
  });
});
