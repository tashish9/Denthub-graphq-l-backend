import mongoose from 'mongoose';
import { UpdateInfo } from './update-info';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  type: {
    type: String,
    enum: ['DENTIST', 'TECHNICIAN'],
  },
  role: {
    type: String, // gotta add enum
    enum: [
      // constants
      'DENTIST_ADMIN',
      'DENTIST_USER',
      'TECHNICIAN_ADMIN',
      'TECHNICIAN_USER',
    ],
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organizations',
  },
  created: {
    type: UpdateInfo,
  },
  updated: {
    type: UpdateInfo,
  },
  active: {
    type: Boolean,
    default: true,
  },
  profileImage: {
    type: String,
  }, // link basically
  phoneNumber: {
    type: String,
    unique: true,
  }, // convert to num later // use num only when gotta go for direct calcs
});

export const Users = mongoose.model('Users', userSchema); // obj
