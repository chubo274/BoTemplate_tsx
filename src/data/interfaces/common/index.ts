import { Vibration } from "react-native";
import { ActionStatus } from "../../../shared/helpers/constant";

export interface IDictionary<T> {
    [key: string]: T;
}

export interface IActionParams {
    request?: any;
    sectionId?: string;
    isAppend?: boolean;
    canLoadMore?: boolean | IDictionary<boolean>;

    [key: string]: any;
}

export interface IAction<T> {
    type: string;
    payload?: T;
    params?: IActionParams;
    error?: any;
    callBacks?: {
        onSuccess?: (data?: any) => void;
        onFailed?: (error?: string) => void;
    };

    [key: string]: any;
}

export interface IReducer<T> {
    isFetching: boolean;
    status: ActionStatus;
    data?: T;
    canLoadMore?: boolean | IDictionary<boolean>;
    params?: IActionParams;
    errorMessage?: string;
    error?: any;
    actionType: string;
    success: boolean;
}
