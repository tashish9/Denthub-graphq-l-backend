import DataLoader from 'dataloader';
import { PubSub } from 'graphql-subscriptions';
import mongoose from 'mongoose';
import { Organization } from './organization';
// k ->
type ContextGraphql = {
  token: string;
  organizationLoader: DataLoader<mongoose.Types.ObjectId, Organization>;
  connectedLabsDataLoader: DataLoader<
    mongoose.Types.ObjectId[],
    Organization[]
  >; // study about args
  pubsub: PubSub;
};

// type DataLoader = {
//   load: Function
// }

export { ContextGraphql };
