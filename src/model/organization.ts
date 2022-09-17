import mongoose from 'mongoose';

type Organization = {
  _id: mongoose.Types.ObjectId;
  name: string;
  contact: {
    email: string;
    phoneNumber: string;
    website: string;
  };
  address: {
    street: string;
    city: string;
    postal_code: string;
    country: string;
  };
  OrganizationNumber: string;
  parentClinicId: mongoose.Types.ObjectId;
  active: boolean;
  type: string;
  created: {
    at: Date;
    by: mongoose.Types.ObjectId;
  };
  updated: {
    at: Date;
    by: mongoose.Types.ObjectId;
  };
  logoImage: string;
  connectedLabs: mongoose.Types.ObjectId[];
};

export { Organization };
