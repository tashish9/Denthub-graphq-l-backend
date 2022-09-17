import { organizationDataLoader } from "./organization";

const usersDataLoaders = {
  User: {
    organization: organizationDataLoader
  },
}


export {usersDataLoaders}