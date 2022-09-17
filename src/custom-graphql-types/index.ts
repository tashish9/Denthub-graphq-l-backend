import { dateScalar } from './date';
import { mongoDbObjectIdScaler } from './objectId';

const customGraphqlTypes = {
  Date: dateScalar,
  ObjectID: mongoDbObjectIdScaler,
};

export { customGraphqlTypes };
