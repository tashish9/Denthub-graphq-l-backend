import mongoose from 'mongoose';

const UpdateInfo = new mongoose.Schema({
  at: {
    type: Date,
  },
  by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
  },
});

// const UpdateInfo = mongoose.model('UpdateInfo', updatInfoSchema);
export { UpdateInfo };

// aggregation framework?
// db.users.aggregate([{$project : {  }}])
