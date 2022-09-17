import { throwUnAuthenticatedError } from '../../../error';
import { authenticateUserWithToken } from '../../../middlewares';
import { ContextGraphql, Organization } from '../../../model';
import { deleteOrganizationDB } from '../services/delete-organization';

const deleteOrganization = async (
  _parent: unknown,
  args: any,
  context: ContextGraphql
) => {
  const [id] = args;
  const user = await authenticateUserWithToken(context.token);
  if (user.role !== 'SUPER_ADMIN') {
    throwUnAuthenticatedError('Access denied');
  }
  const deletedOrganization = await deleteOrganizationDB(args.id);
  return true;
};

export { deleteOrganization };
