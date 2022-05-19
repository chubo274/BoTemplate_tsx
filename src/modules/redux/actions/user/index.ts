import { IAction } from "src/data/interfaces/common";
import { IPostLoginRequest } from "src/data/interfaces/request/user/IPostLoginRequest";
import { UserModel } from "src/data/models/UserModel";
import { LOGOUT_USER, POST_LOGIN } from "../actionTypes";
import { createActionNormalTypes } from "../helper";

/// LOGIN
export const loginEmailTypes = POST_LOGIN;
export const loginEmailActionTypes = createActionNormalTypes(loginEmailTypes);

export const postLoginRequest = (
    payload: IPostLoginRequest,
    callBacks?: { onSuccess?: (data?: any) => void; onFailed?: (error?: string) => void }
): IAction<IPostLoginRequest> => ({
    type: loginEmailActionTypes.start,
    payload: payload,
    callBacks,
})

export const postLoginSuccess = (
    payload: UserModel,
    params: { request?: IPostLoginRequest },
    callBacks?: { onSuccess?: (data?: any) => void; onFailed?: (error?: string) => void }
): IAction<UserModel> => ({
    type: loginEmailActionTypes.success,
    payload,
    params,
    callBacks,
})

export const postLoginFailed = (
    payload: any,
    callBacks?: { onSuccess?: (data?: any) => void; onFailed?: (error?: string) => void }
): IAction<any> => ({
    type: loginEmailActionTypes.failed,
    payload,
    callBacks,
})

/// LOGOUT
export const logOutTypes = LOGOUT_USER;
export const logOutActionTypes = createActionNormalTypes(logOutTypes);

export const logoutUser = (): IAction<any> => ({
    type: logOutActionTypes.start
})

export const logoutUserSuccess = (payload?: any): IAction<any> => ({
    type: logOutActionTypes.success,
    payload
})

export const logoutUserFailed = (payload: any): IAction<any> => ({
    type: logOutActionTypes.failed,
    payload
})