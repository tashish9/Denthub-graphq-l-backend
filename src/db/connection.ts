import mongoose, { ConnectOptions } from 'mongoose';
import { CONSTANTS } from '../config';
const { MONGO_URI } = CONSTANTS;

const connectToMongoDb = () => {
  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    // useUnifiedTopology: true,
  } as ConnectOptions);

  mongoose.connection.on('connected', () => {
    console.log('MongoDb connected on port 27017');
  });
  mongoose.connection.on('error', (err: Error) => {
    console.log(`An error occurred. ERROR: ${err}`);
  });
  mongoose.connection.on('disconnected', () => {
    console.log('MongoDb disconnected!');
  });
};

export { connectToMongoDb };
