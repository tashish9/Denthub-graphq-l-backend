import { authenticateUserWithToken } from '../../../middlewares';
import { ContextGraphql } from '../../../model';
import { getOrganizationList } from '../services/get-organization-list';

const allOrganizations = async (
  _parent: unknown,
  args: any,
  context: ContextGraphql
) => {
  console.log('request arrived for org list');
  const admin = await authenticateUserWithToken(context.token);
  const organizationList = await getOrganizationList(admin, args);
  return organizationList;
};

export { allOrganizations };
