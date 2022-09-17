import { merge } from 'lodash';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { usersResolver } from './users/resolvers';
import { organizationsResolver } from './organizations/resolvers';
import { customGraphqlTypes } from '../custom-graphql-types';
import { organizationLoader } from './users/data-loaders/organization-data-loader';
import { connectedLabsDataLoader } from './organizations/data-loaders/connected-labs-data-loader';

const typeDefs = loadSchemaSync('./**/*.graphql', {
  loaders: [new GraphQLFileLoader()],
});

const resolvers = merge(
  usersResolver,
  customGraphqlTypes,
  organizationsResolver
);

const dataLoader = {
  organizationLoader,
  connectedLabsDataLoader,
};

export { typeDefs, resolvers, dataLoader };
