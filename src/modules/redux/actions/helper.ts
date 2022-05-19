import { ACTION_LIST, ACTION_PREFIX, ACTION_SECTION, FAILED_ACTION, LOADMORE_ACTION, REFRESH_ACTION, SUCCESS_ACTION } from "./actionTypes";

interface IActionType {
    start: string;
    failed: string;
}
const createActionTypes = (actionType: string): IActionType => {
    return {
        start: `${actionType}_${ACTION_PREFIX}`,
        failed: `${actionType}_${FAILED_ACTION}`
    };
};


interface IActionNormalType extends IActionType {
    success: string;
}

interface IActionListType extends IActionType {
    listSuccess: string;
    listRefresh: string;
    listLoadMore: string;
}

interface IActionSectionListType extends IActionType {
    sectionSuccess: string;
    sectionRefresh: string;
    sectionLoadMore: string;
}

export const createActionNormalTypes = (actionType: string): IActionNormalType => {
    return {
        ...createActionTypes(actionType),
        success: `${actionType}_${SUCCESS_ACTION}`,
    };
};

export const createActionListTypes = (actionType: string): IActionListType => {
    return {
        ...createActionTypes(actionType),
        listSuccess: `${ACTION_LIST}_${actionType}_${SUCCESS_ACTION}`,
        listRefresh: `${ACTION_LIST}_${actionType}_${REFRESH_ACTION}`,
        listLoadMore: `${ACTION_LIST}_${actionType}_${LOADMORE_ACTION}`
    };
};

export const createActionSectionTypes = (actionType: string): IActionSectionListType => {
    return {
        ...createActionTypes(actionType),
        sectionSuccess: `${ACTION_SECTION}_${actionType}_${SUCCESS_ACTION}`,
        sectionRefresh: `${ACTION_SECTION}_${actionType}_${REFRESH_ACTION}`,
        sectionLoadMore: `${ACTION_SECTION}_${actionType}_${LOADMORE_ACTION}`
    };
};