import mongoose from 'mongoose';
import { Organization } from './organization';

type User = {
  _id: mongoose.Types.ObjectId;
  username: string;
  knownFor: string[];
  type: string;
  role: string;
  email: string;
  password: string;
  organization: mongoose.Types.ObjectId | Organization;
  created: {
    at: Date;
    by: mongoose.Types.ObjectId;
  };
  updated: {
    at: Date;
    by: mongoose.Types.ObjectId;
  };
  active: boolean;
  profileImage: string;
  phoneNumber: string;
};

export { User };
