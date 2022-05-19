import { getDataRepo } from "./getDataRepo";
import { getSectionRepo } from "./getSectionRepo";

const HomeRepository = {
    ...{ ...getDataRepo() },
    ...{ ...getSectionRepo() },
};

export default HomeRepository;