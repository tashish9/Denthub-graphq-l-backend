import mongoose from 'mongoose';
import { ContextGraphql, Organization, User } from '../../../model';

const organizationDataLoader = async (
  parent: User,
  _: unknown,
  context: ContextGraphql
) => {
  if (!parent.organization) {
    return {};
  }
  return context.organizationLoader.load(
    parent.organization as mongoose.Types.ObjectId
  );
};

export { organizationDataLoader };
