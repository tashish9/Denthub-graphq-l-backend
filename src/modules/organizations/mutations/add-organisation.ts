import { ContextGraphql, Organization, User } from '../../../model';
import { addOrganizationDB } from '../services/add-organization';
import { authenticateUserWithToken } from '../../../middlewares';
const addOrganization = async (
  _parent: unknown,
  args: Organization,
  context: { token: string }
) => {
  const user = await authenticateUserWithToken(context.token);
  const argsObject = { ...args };
  const organization = await addOrganizationDB(
    argsObject,
    user._id as unknown as string
  );
  return organization;
};

export { addOrganization };
