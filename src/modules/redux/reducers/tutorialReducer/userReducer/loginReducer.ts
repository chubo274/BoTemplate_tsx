import { IAction } from "src/data/interfaces/common";
import { UserModel } from "src/data/models/UserModel";
import { loginEmailTypes } from "src/modules/redux/actions/tutorialAction/user";
import BaseReducer from "../../handler/baseReducer";

const reducerHandler = new BaseReducer<UserModel, IAction<any>>(loginEmailTypes);

export default reducerHandler;