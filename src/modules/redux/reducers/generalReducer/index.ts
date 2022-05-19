import { combineReducers } from "redux";
import languageReducer from './languageReducer'

export const generalReducer = combineReducers({
    languageReducer: languageReducer.reducer,
});