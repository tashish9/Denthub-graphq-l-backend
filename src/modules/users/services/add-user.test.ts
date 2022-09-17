import { addUser } from './add-user';
import * as userDbFuncs from '../../../db/controllers/users';
import { User } from '../../../model';
import { hash } from 'bcrypt';
import bcrypt from 'bcrypt';

const fakeFindUser = jest.spyOn(userDbFuncs, 'findUser');
const fakeCreateUser = jest.spyOn(userDbFuncs, 'createUser');
// const fakeBcrypt = jest.mock('bcrypt') as unknown as jest.Mock<typeof bcrypt>;
const fakeBcrypt = jest.spyOn(bcrypt, 'hash');

describe('Testing add-user service function', () => {
  it('should return a proper user', async () => {
    fakeBcrypt.mockClear();
    const sampleInput = {
      email: 'imasamplemail@email.com',
      password: 'password',
    };
    fakeFindUser.mockResolvedValueOnce(null);
    fakeCreateUser.mockImplementation((userInfo) => {
      return userInfo as unknown as Promise<User>;
    });
    const createdUser = await addUser(sampleInput as User);

    const isPasswordSame = await bcrypt.compare(
      sampleInput.password,
      createdUser.password
    );
    expect(isPasswordSame).toBe(true);
    expect(sampleInput.email).toBe(createdUser.email);
  }); // happy path 

  it('should throw error bcs email already exist in Db', async () => {
    try {
      const sampleInput = {
        email: 'justafakeemail',
      };
      fakeFindUser.mockResolvedValue(sampleInput);
      const createdUser = await addUser(sampleInput as User);
    } catch (error) {
      expect(error.message).toBe('User Already Exists');
      // expect(bcrypt.hash).toHaveBeenCalledTimes(0);
    }
  });

  it('should throw error when mongodb func fails', async () => {
    fakeBcrypt.mockClear();
    try {
      const sampleInput = {
        email: 'justafakeemail',
        password: 'password',
      };
      fakeFindUser.mockImplementation(() => {
        throw new Error('connection timed out');
      });

      const createdUser = await addUser(sampleInput as User);
    } catch (error) {
      expect(error.message).toBe('connection timed out');
      expect(fakeBcrypt).toHaveBeenCalledTimes(0);
    }
  });
  //  expect(getUnreadMessagesForUser).toHaveBeenCalledTimes(0);
  // error path cases
  // 1. user already exist
  // 2. can hash throw error? ->kennot
  // 3. can create user throw error ??
});
