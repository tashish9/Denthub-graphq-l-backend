import { findOrganizations } from '../../../db/controllers/organizations';
import { Organization } from '../../../model';
// const DataLoader = require('dataloader');
import DataLoader from 'dataloader';

const organizationLoader = new DataLoader(async (organizationIds: string[]) => {
  const results = await getOrganizationsById(organizationIds);
  return results;
});

const getOrganizationsById = async (
  keys: string[]
): Promise<Organization[]> => {
  const organizationArrayFromDB = await findOrganizations({
    _id: { $in: keys },
  });

  const organizations: Organization[] = keys.map((organizationId) => {
    return organizationArrayFromDB.find((organization) => {
      return organization._id.toString() === organizationId.toString();
    });
  });

  return organizations;
};

export { organizationLoader };
