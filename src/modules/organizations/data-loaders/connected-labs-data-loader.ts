import { Organization } from '../../../model';
import { findOrganizations } from '../../../db/controllers/organizations';

import DataLoader from 'dataloader';
const connectedLabsDataLoader = new DataLoader(
  async (organizationIdsArray: string[][]) => {
    const keys: string[] = [];
    organizationIdsArray.forEach((arr) => {
      arr.forEach((el) => {
        if (!keys.includes(el)) {
          keys.push(el);
        }
      });
    });

    const organizationArray = await findOrganizations({
      _id: { $in: keys },
    });

    const result: Organization[][] = organizationIdsArray.map(
      (organizationIDs) => {
        return organizationIDs.map((organizationId) => {
          return organizationArray.find((organization) => {
            return organization._id.toString() === organizationId.toString();
          });
        });
      }
    );
    return result;
  }
);

export { connectedLabsDataLoader };

//  implement subs (listen to sign in )
// Variable naming
// avoid redundant funcs
// Create generic func for data loader and in general for reusability
