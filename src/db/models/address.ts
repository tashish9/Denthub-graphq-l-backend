import mongoose from "mongoose";

const Address = new mongoose.Schema({
  street: {
    type: String,
  },
  city: {
    type: String,
  },
  postal_code: {
    type: String,
  },
  country: {
    type: String,
  },
})

// const Address = mongoose.model('Address', addressSchema);
export { Address };
