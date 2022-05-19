import { localStoreUserRepo } from "./localStoreUserRepo";
import { userDataRepo } from "./userDataRepo";

const UserRepository = {
    ...{ ...localStoreUserRepo() },
    ...{ ...userDataRepo() },
}

export default UserRepository;