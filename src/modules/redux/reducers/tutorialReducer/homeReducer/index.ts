import { combineReducers } from "redux";
import personReducer from './personReducer';
import friendReducer from './friendReducer';

export const homeReducer = combineReducers({
    personReducer: personReducer.reducer,
    friendReducer: friendReducer.reducer,
});