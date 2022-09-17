import { Organization } from '../../model';
import { Organizations } from '../models';

const findOrganization = (condition = {}, selection = {}) => {
  return Organizations.findOne(condition, selection);
};

const createOrganizationDB = (organizationData: Organization) => {
  return Organizations.create({
    ...organizationData,
  });
};

const findOrganizations = (
  condition = {},
  selection = {}
): Promise<Organization[]> => {
  return Organizations.find(condition, selection) as unknown as Promise<
    Organization[]
  >;
};

const findOrganizationById = (
  id: string,
  selection = {}
): Promise<Organization> => {
  return Organizations.findById(
    id,
    selection
  ) as unknown as Promise<Organization>;
}; // redundant

const findOneAndUpdateOrganization = (filter = {}, update = {}) => {
  return Organizations.findOneAndUpdate(
    filter,
    { $set: update },
    {
      returnDocument: 'after',
      // or returnNewdoucment : true
    }
  );
};

export {
  findOrganization,
  createOrganizationDB,
  findOrganizations,
  findOrganizationById,
  findOneAndUpdateOrganization,
};
