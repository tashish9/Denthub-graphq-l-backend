import {
  findOneAndUpdateOrganization,
} from '../../../db/controllers/organizations';
import { throwNotFoundError } from '../../../error';
import { Organization } from '../../../model';

const deleteOrganizationDB = async (
  id: string
): Promise<Organization> => {
  const organization = await findOneAndUpdateOrganization(
    { id },
    { active: false }
  );
  if (!organization) {
    throwNotFoundError('Organization does not exist');
  }
  return organization;
};

export { deleteOrganizationDB };
