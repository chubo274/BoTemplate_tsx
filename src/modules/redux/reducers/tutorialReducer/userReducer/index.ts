import { combineReducers } from "redux";
import loginReducer from './loginReducer';

export const userReducer = combineReducers({
    loginReducer: loginReducer.reducer,
});