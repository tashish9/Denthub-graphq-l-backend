import { usersQueriesResolver } from './queries';
import { usersMutationsResolver } from './mutations';
import { usersSubscriptionsResolver } from './subscriptions/resolvers';
import { usersDataLoaders } from './data-loaders';

const usersResolver = {
  ...usersQueriesResolver,
  ...usersMutationsResolver,
  ...usersSubscriptionsResolver,
  ...usersDataLoaders,
};

export { usersResolver };

// TODO Konytra application security
