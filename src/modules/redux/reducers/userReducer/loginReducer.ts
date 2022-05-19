import { UserModel } from "src/data/models/UserModel";
import { IAction } from "../../../../data/interfaces/common";
import { loginEmailTypes } from "../../actions/user";
import BaseReducer from "../handler/baseReducer";

const reducerHandler = new BaseReducer<UserModel, IAction<any>>(loginEmailTypes);

export default reducerHandler;