import { all } from "redux-saga/effects";
import { homeSaga } from "./homeSaga";
import { userSaga } from "./userSaga";

export default function* watch() {
    yield all([homeSaga(), userSaga()]);
} 