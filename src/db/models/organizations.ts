import mongoose from 'mongoose';
import { Address } from './address';
import { Contact } from './contact';
import { UpdateInfo } from './update-info';

const OrganizationSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  contact: {
    type: Contact,
  },
  address: {
    type: Address,
  },
  OrganizationNumber: {
    type: String,
    unique: true,
  },
  parentClinicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organizations',
  }, // ref to Organization
  active: {
    type: Boolean,
    default: true,
  },
  type: {
    type: String,
  },
  created: {
    type: UpdateInfo,
  },
  updated: {
    type: UpdateInfo,
  },
  logoImage: {
    type: String,
  },
  connectedLabs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organizations',
    },
  ],
});

const Organizations = mongoose.model('Organizations', OrganizationSchema);
export { Organizations };
