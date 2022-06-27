import { IAction, IActionCallBacks, IActionParams } from "src/data/interfaces/common";
import { IGetDataRequest } from "src/data/interfaces/request/home/IGetDataRequest";
import { IGetSectionRequest } from "src/data/interfaces/request/home/IGetSectionRequest";
import { PersonModel } from "src/data/models/PersonModel";
import { GET_DATA, GET_SECTION } from "../../actionTypes";
import { createActionNormalTypes, createActionListTypes, createActionSectionTypes } from "../../helper";

export const getDataTypes = GET_DATA;
export const getDataActionTypes = createActionListTypes(getDataTypes);
// export const getDataActionTypes = createActionNormalTypes(getDataTypes);

export const getDataRequest = (
    payload: IGetDataRequest,
    callBacks?: IActionCallBacks
): IAction<IGetDataRequest> => ({
    type: getDataActionTypes.start,
    payload: payload,
    callBacks,
})

export const getDataSuccess = (
    payload: PersonModel[],
    params: IActionParams<IGetDataRequest>,
    callBacks?: IActionCallBacks
): IAction<PersonModel[]> => ({
    type: getDataActionTypes.listSuccess,
    payload,
    params,
    callBacks,
})

export const getDataFailed = (
    payload: any,
    callBacks?: IActionCallBacks
): IAction<any> => ({
    type: getDataActionTypes.failed,
    payload,
    callBacks,
})

export const getDataRefresh = (
    payload: IGetDataRequest,
    callBacks?: IActionCallBacks
): IAction<IGetDataRequest> => ({
    type: getDataActionTypes.listRefresh,
    payload: payload,
    callBacks,
})

export const getDataLoadMore = (
    payload: IGetDataRequest,
    callBacks?: IActionCallBacks
): IAction<IGetDataRequest> => ({
    type: getDataActionTypes.listLoadMore,
    payload: payload,
    callBacks,
})

// 
export const getSectionTypes = GET_SECTION;
export const getSectionActionTypes = createActionSectionTypes(getSectionTypes);

export const getSectionRequest = (
    payload: IGetSectionRequest,
    callBacks?: IActionCallBacks
): IAction<IGetSectionRequest> => ({
    type: getSectionActionTypes.start,
    payload: payload,
    callBacks,
})

export const getSectionSuccess = (
    payload: PersonModel[],
    params: IActionParams<IGetSectionRequest>,
    callBacks?: IActionCallBacks
): IAction<PersonModel[]> => ({
    type: getSectionActionTypes.sectionSuccess,
    payload,
    params,
    callBacks,
})

export const getSectionFailed = (
    payload: any,
    callBacks?: IActionCallBacks
): IAction<any> => ({
    type: getSectionActionTypes.failed,
    payload,
    callBacks,
})

export const getSectionRefresh = (
    payload: IGetSectionRequest,
    callBacks?: IActionCallBacks
): IAction<IGetSectionRequest> => ({
    type: getSectionActionTypes.sectionRefresh,
    payload: payload,
    callBacks,
})

export const getSectionLoadMore = (
    payload: IGetSectionRequest,
    callBacks?: IActionCallBacks
): IAction<IGetSectionRequest> => ({
    type: getSectionActionTypes.sectionLoadMore,
    payload: payload,
    callBacks,
})