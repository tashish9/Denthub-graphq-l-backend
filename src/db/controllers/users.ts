import mongoose from 'mongoose';
import { User } from '../../model/user';
import { Users } from '../models';

const findUser = (condition = {}, selection = {}) => {
  return Users.findOne(condition, selection);
};

const findusers = (condition = {}, selection = {}) => {
  return Users.find(condition, selection) as unknown as User[];
};
// use only if enforcing

const findUserById = (_id: string, selection = {}) => {
  return Users.findById(_id, selection);
}; // redundant

const findOneAndUpdateUser = (filter = {}, update = {}) => {
  return Users.findOneAndUpdate(
    filter,
    {
      $set: update,
    },
    {
      returnDocument: 'after',
    }
  );
};

const createUser = (userData: User): Promise<User> => {
  return Users.create({
    ...userData,
  });
};

export { findUser, findusers, findUserById, createUser, findOneAndUpdateUser };
