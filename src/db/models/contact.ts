import mongoose from 'mongoose';

const Contact = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  phoneNumber: {
    type: String,
    unique: true,
  },
  website: {
    type: String,
    unique: true,
  },
});

// const Contact = mongoose.model('Address', contactSchema);
export { Contact };
