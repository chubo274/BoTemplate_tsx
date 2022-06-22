import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import Config from 'src/configs/config';
import { UserRepository } from 'src/data/repositories/tutorialScreen/user';
import Interceptor from '../Interceptor';

type RefreshTokenCallback = (token: string, refreshToken?: string) => void

let isRefreshing = false;
let refreshSubscribers: RefreshTokenCallback[] = [];

export class RetryInterceptor extends Interceptor {
    axiosInstance: AxiosInstance;
    _userRepository: typeof UserRepository;

    constructor(axiosInstance: AxiosInstance, resource: string, resourceType?: any, setting?: Config) {
        super(resource, resourceType, setting);
        this.axiosInstance = axiosInstance;
        this._userRepository = UserRepository;
    }

    requestFulfilled = (config: AxiosRequestConfig) => {
        return config;
    };

    requestReject = (error: any) => {
        return Promise.reject(error);
    };

    responseFulfilled = (response: AxiosResponse) => {
        return response;
    };

    responseReject = (error: AxiosError) => {
        let status = 0;
        if (error.response) {
            status = error.response.status;
            const originalRequest = error.config;
            if (status === 401) {
                if (!isRefreshing) {
                    isRefreshing = true;
                    // call api refreshToken:

                    // this._userRepository.refreshToken()
                    //     .then((response: AxiosResponse) => {
                    //         isRefreshing = false;
                    //         onRefreshed(response.data!.token, response.data!.refreshToken);
                    //     });
                }

                const retryOrigReq = new Promise((resolve, reject) => {
                    const handler: RefreshTokenCallback = async (token, refreshToken) => {
                        // replace the expired token and retry
                        if (!originalRequest.headers) {
                            originalRequest.headers = {};
                        }
                        originalRequest.headers['Authorization'] = 'Bearer ' + token;
                        await this._userRepository.updateUser([
                            { key: 'token', value: token },
                            { key: 'refreshToken', value: refreshToken },
                        ]);

                        resolve(this.axiosInstance.request(originalRequest));
                    };
                    subscribeTokenRefresh(handler);
                });
                return retryOrigReq;
            } else {
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    };
}

const subscribeTokenRefresh = (cb: RefreshTokenCallback) => {
    refreshSubscribers.push(cb);
}

const onRefreshed = (token: string, refreshToken?: string) => {
    refreshSubscribers.map(cb => cb(token, refreshToken));
    refreshSubscribers = [];
}