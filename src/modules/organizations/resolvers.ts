import { allOrganizations, organizationByID } from './queries';
import { deleteOrganization, addOrganization } from './mutations';
import { ContextGraphql, Organization } from '../../model';

const organizationsResolver = {
  Query: {
    organizations: allOrganizations,
    organizationByID,
  },
  Mutation: {
    // deleteOrganization,
    addOrganization,
  },
  Organization: {
    connectedLabs: async (
      parent: Organization,
      _args: unknown,
      context: ContextGraphql
    ): Promise<Organization[]> => {
      if (!parent.connectedLabs.length) {
        return [];
      }
      return context.connectedLabsDataLoader.load(parent.connectedLabs);
    },
  },
};

export { organizationsResolver };
