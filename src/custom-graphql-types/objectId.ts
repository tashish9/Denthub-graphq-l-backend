import { GraphQLScalarType } from 'graphql';
import mongoose from 'mongoose';

const mongoDbObjectIdScaler = new GraphQLScalarType({
  name: 'ObjectID',
  description: 'Custom MongoDB ObjectID scaler type',
  serialize(value: mongoose.Types.ObjectId) {
    return value.toString();
    // convert outgoing objectID to string
  },
  parseValue(value: string) {
    // return new mongoose.Schema.Types.ObjectId(value);
    return new mongoose.Types.ObjectId(value);
    // getting input as object id from args even if user types string
  },
});

export { mongoDbObjectIdScaler };
