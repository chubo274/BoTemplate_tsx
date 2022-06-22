import { localStoreUserRepo } from "./localStoreUserRepo";
import { userDataRepo } from "./userDataRepo";

export const UserRepository = {
    ...{
        ...localStoreUserRepo(),
        ...userDataRepo(),
    },
}
