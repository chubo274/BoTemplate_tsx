import { IAction, IDictionary } from "../../../../data/interfaces/common";
import { PersonModel } from "../../../../data/models/PersonModel";
import { getSectionTypes } from "../../actions/home";
import BaseReducer from "../handler/baseReducer";

const reducerHandler = new BaseReducer<IDictionary<PersonModel[]>, IAction<any>>(getSectionTypes);

export default reducerHandler;