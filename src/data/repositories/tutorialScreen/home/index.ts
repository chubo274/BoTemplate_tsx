import { getDataRepo } from "./getDataRepo";
import { getSectionRepo } from "./getSectionRepo";

export const HomeRepository = {
    ...{
        ...getDataRepo(),
        ...getSectionRepo(),
    },
};
