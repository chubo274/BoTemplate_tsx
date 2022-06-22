
import { IAction } from "src/data/interfaces/common";
import { PersonModel } from "src/data/models/PersonModel";
import { getDataTypes } from "src/modules/redux/actions/tutorialAction/home";
import BaseReducer from "../../handler/baseReducer";

const reducerHandler = new BaseReducer<PersonModel[], IAction<any>>(getDataTypes);

export default reducerHandler;