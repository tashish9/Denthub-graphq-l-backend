import mongoose from 'mongoose';
import { findOrganization } from '../../../db/controllers/organizations';
import { authenticateUserWithToken } from '../../../middlewares';
import { ContextGraphql } from '../../../model';

const organizationByID = async (
  _parent: unknown,
  args: { _id: mongoose.Types.ObjectId },
  context: ContextGraphql
) => {
    const user = authenticateUserWithToken(context.token);
    const organization = await findOrganization({ _id: args._id });
    return organization;
};

export { organizationByID };
