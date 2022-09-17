import mongoose from 'mongoose';
import {
  createOrganizationDB,
  findOrganization,
} from '../../../db/controllers/organizations';
import { throwBadRequestError } from '../../../error';
import { Organization } from '../../../model';
const addOrganizationDB = async (
  orgFromRequest: Organization,
  userId: string
): Promise<Organization> => {
  const {
    contact: { email },
  } = orgFromRequest;
  const org = await findOrganization({ 'contact.email': email });
  if (org) {
    throwBadRequestError('Org already exist', false);
  }
  const organizationData = {
    ...orgFromRequest,
    created: {
      at: new Date(),
      by: new mongoose.Types.ObjectId(userId),
    },
  };
  return createOrganizationDB(organizationData as unknown as Organization);
};

export { addOrganizationDB };
