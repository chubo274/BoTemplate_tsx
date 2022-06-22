import ApiGateway from "src/data/api";
import { baseUrl, urls } from "src/data/api/resource";
import { IPostLoginRequest } from "src/data/interfaces/request/user/IPostLoginRequest";
import ResponseModel from "src/data/models/common/responseModel";
import { UserModel } from "src/data/models/UserModel";
import { localStoreUserRepo } from "./localStoreUserRepo";

export interface ISessionStorage {
    token?: string;
    refreshToken?: string;
}

/**
 * Always store token in session storage for faster retrieve
 * @type {{token: string}}
 */
const SessionStorage: ISessionStorage = {
    token: '',
};

export const userDataRepo = () => {
    const { setUser, getUser, removeUser, updateUser } = localStoreUserRepo();
    const login = async (body: IPostLoginRequest): Promise<ResponseModel<UserModel>> => {
        const resource = `${baseUrl}${urls.loginEmail}`;
        const apiGateway = new ApiGateway({
            method: 'POST',
            resource,
            body
        });
        const response = await apiGateway.execute();
        if (response && response?.status === 200) {
            const responseParsed = UserModel.parseFromJson(response?.data);
            SessionStorage.token = responseParsed.token;
            SessionStorage.refreshToken = responseParsed.refreshToken;
            await setUser(responseParsed);
            return ResponseModel.createSuccess(responseParsed);
        } else {
            return ResponseModel.createError(
                response.statusCode,
                response.statusCode.toString(),
                response.message,
                response.rawError
            );
        }
    }

    const getTokenUser = (): ISessionStorage => {
        return SessionStorage;
    }

    const logout = async (): Promise<ResponseModel<boolean>> => {
        SessionStorage.token = '',
            SessionStorage.refreshToken = '',
            await removeUser();
        return ResponseModel.createSuccess(true);
    }

    return {
        login,
        logout,
        getTokenUser,
    }
}