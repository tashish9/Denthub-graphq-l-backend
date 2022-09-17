import { findOrganizations } from '../../../db/controllers/organizations';
import { findusers } from '../../../db/controllers/users';
import { throwBadRequestError } from '../../../error';
import { Organization } from '../../../model';
import { User } from '../../../model/user';

const getUsersList = async (
  admin: User,
  args: { type: string | undefined }
): Promise<User[] | undefined> => {
  // ? check role & then accordingly return data

  if (admin.role === 'SUPER_ADMIN') {
    const type = args.type;
    if (!type) {
      throwBadRequestError('Params Required');
    }
    return findusers({ type });
    // return findusers();
  } else if (admin.role === 'DENTIST_ADMIN') {
    // ? Dentists of any role are gonna get same list . now update is responsibility of other funcs & frontend
    // return users under own clinic & child clinic

    console.log('verified that logged user is dentist');

    const childClinics = await findOrganizations({
      parentClinic: admin.organization,
    });

    const parentChildClinics = [
      admin.organization as Organization,
      ...childClinics,
    ];

    const parentChildClinicUsers = await findusers({
      organization: {
        $in: parentChildClinics,
      },
    });

    const firstUserIdx = parentChildClinicUsers.findIndex((el) => {
      return el._id.toString() === admin._id.toString();
    });

    [parentChildClinicUsers[0], parentChildClinicUsers[firstUserIdx]] = [
      parentChildClinicUsers[firstUserIdx],
      parentChildClinicUsers[0],
    ];

    return parentChildClinicUsers;
  } else if (admin.role === 'DENTIST_USER') {
    const parentClinicUsers = await findusers({
      organization: (admin.organization as Organization)._id,
    });

    const firstUserIdx = parentClinicUsers.findIndex((el) => {
      return el._id.toString() === admin._id.toString();
    });

    [parentClinicUsers[0], parentClinicUsers[firstUserIdx]] = [
      parentClinicUsers[firstUserIdx],
      parentClinicUsers[0],
    ];

    return parentClinicUsers;
  } else if (admin.role === 'TECHNICIAN_ADMIN') {
    console.log('trying to send users data for tech admin');
    const adminLabUsers = await findusers(
      {
        organization: (admin.organization as Organization)._id,
      },
      {
        password: 0,
      }
    );
    console.log(adminLabUsers, 'adminLabUsers');
    return adminLabUsers;
  }
};

export { getUsersList };
