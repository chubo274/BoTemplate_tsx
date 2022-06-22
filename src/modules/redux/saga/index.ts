import { all } from "redux-saga/effects";
import { homeSaga } from "./tutorialSaga/homeSaga";
import { userSaga } from "./tutorialSaga/userSaga";

export default function* watch() {
    yield all([homeSaga(), userSaga()]);
} 