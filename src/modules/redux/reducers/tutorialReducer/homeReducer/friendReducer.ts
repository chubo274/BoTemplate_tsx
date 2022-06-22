import { IAction, IDictionary } from "src/data/interfaces/common";
import { PersonModel } from "src/data/models/PersonModel";
import { getSectionTypes } from "src/modules/redux/actions/tutorialAction/home";
import BaseReducer from "../../handler/baseReducer";

const reducerHandler = new BaseReducer<IDictionary<PersonModel[]>, IAction<any>>(getSectionTypes);

export default reducerHandler;