import { AppLanguage } from "src/shared/localization";
import { IAction } from "../../../../data/interfaces/common";
import { changeLanguageTypes } from "../../actions/general";
import BaseReducer from "../handler/baseReducer";

const reducerHandler = new BaseReducer<AppLanguage, IAction<any>>(changeLanguageTypes);

export default reducerHandler;