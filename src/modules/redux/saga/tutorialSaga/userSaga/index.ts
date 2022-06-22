import { all, put, takeLatest } from "redux-saga/effects";
import { IAction } from "src/data/interfaces/common";
import { IPostLoginRequest } from "src/data/interfaces/request/user/IPostLoginRequest";
import ResponseModel from "src/data/models/common/responseModel";
import { UserModel } from "src/data/models/UserModel";
import { UserRepository } from "src/data/repositories/tutorialScreen/user";
import { loginEmailActionTypes, logOutActionTypes, logoutUserFailed, logoutUserSuccess, postLoginFailed, postLoginSuccess } from "src/modules/redux/actions/tutorialAction/user";

function* postLoginEmail(action: IAction<IPostLoginRequest>) {
    const { payload, callBacks } = action;
    try {
        const response: ResponseModel<UserModel> = yield UserRepository.login(payload!);
        if (response.statusCode === 200 && response.data) {
            yield put(postLoginSuccess(response.data!, { request: payload }));
            callBacks && callBacks?.onSuccess && callBacks?.onSuccess();
        } else {
            yield put(postLoginFailed(response.message));
            callBacks && callBacks?.onFailed && callBacks?.onFailed();
        }
    } catch (error) {
        yield put(postLoginFailed(error));
        callBacks && callBacks?.onFailed && callBacks?.onFailed();
    }
}

function* logOut(action: IAction<any>) {
    const { payload, callBacks } = action;
    try {
        const response: ResponseModel<UserModel> = yield UserRepository.logout();
        if (response.statusCode === 200 && response.data) {
            yield put(logoutUserSuccess());
            callBacks && callBacks?.onSuccess && callBacks?.onSuccess();
        }
    } catch (error) {
        yield put(logoutUserFailed(error));
        callBacks && callBacks?.onFailed && callBacks?.onFailed();
    }
}

export const userSaga = function* () {
    yield all([
        takeLatest(loginEmailActionTypes.start, postLoginEmail),
        takeLatest(logOutActionTypes.start, logOut),
    ]);
}