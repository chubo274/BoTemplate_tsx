import { combineReducers } from "redux";
import { logOutActionTypes } from "../actions/user";
import { homeReducer } from "./homeReducer";
import { userReducer } from "./userReducer";
import { generalReducer } from "./generalReducer";

const appReducer = combineReducers({
    generalReducer,
    homeReducer,
    userReducer,
});

const rootReducer = (state: any, action: any) => {
    if (action.type === logOutActionTypes.success) {
        delete state.homeReducer;
        delete state.userReducer;
    }
    return appReducer(state, action);
}

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;