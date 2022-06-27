import { ActionStatus } from "../../../shared/helpers/constant";

export interface IDictionary<T> {
    [key: string]: T;
}

export interface IActionCallBacks {
    onSuccess?: (data?: any) => void;
    onFailed?: (error?: string) => void;

    [key: string]: any;
}

export interface IActionParams<T> {
    request?: T;
    sectionId?: string;
    isAppend?: boolean;
    canLoadMore?: boolean | IDictionary<boolean>;

    [key: string]: any;
}

export interface IAction<T> {
    type: string;
    payload?: T;
    params?: IActionParams<any>;
    error?: any;
    callBacks?: IActionCallBacks;

    [key: string]: any;
}

export interface IReducer<T> {
    isFetching: boolean;
    status: ActionStatus;
    data?: T;
    canLoadMore?: boolean | IDictionary<boolean>;
    params?: IActionParams<any>;
    errorMessage?: string;
    error?: any;
    actionType: string;
    success: boolean;
}
