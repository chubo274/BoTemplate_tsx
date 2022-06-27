import { all, put, takeLatest } from "redux-saga/effects";
import { IAction } from "src/data/interfaces/common";
import { IGetDataRequest } from "src/data/interfaces/request/home/IGetDataRequest";
import { IGetSectionRequest } from "src/data/interfaces/request/home/IGetSectionRequest";
import ResponseModel from "src/data/models/common/responseModel";
import { PersonModel } from "src/data/models/PersonModel";
import { HomeRepository } from "src/data/repositories/tutorialScreen/home/index";
import { getDataActionTypes, getDataFailed, getDataSuccess, getSectionActionTypes, getSectionSuccess } from "../../../actions/tutorialAction/home";
import { processCanLoadMore } from "../../helper";

//// DEMO LIST
function* getData(action: IAction<IGetDataRequest>) {
    const { payload, callBacks } = action;
    try {
        const response: ResponseModel<PersonModel[]> = yield HomeRepository.getData();
        if (response.statusCode === 200 && response.data) {
            yield put(getDataSuccess(response.data, { request: payload, isAppend: false }));
            callBacks && callBacks?.onSuccess && callBacks?.onSuccess();
        } else {
            yield put(getDataFailed(response.message));
            callBacks && callBacks?.onFailed && callBacks?.onFailed();
        }
    } catch (error) {
        yield put(getDataFailed(error));
        callBacks && callBacks?.onFailed && callBacks?.onFailed();
    }
}

function* getDataMore(action: IAction<IGetDataRequest>) {
    const { payload, callBacks } = action;
    try {
        const response: ResponseModel<PersonModel[]> = yield HomeRepository.fakeGetDataLoadMore();
        if (response.statusCode === 200 && response.data) {
            yield put(getDataSuccess(response.data, {
                request: payload,
                isAppend: true,
                canLoadMore: processCanLoadMore(response?.data, payload?.pageSize),
            }));
            callBacks && callBacks?.onSuccess && callBacks?.onSuccess();
        } else {
            yield put(getDataFailed(response.message));
            callBacks && callBacks?.onFailed && callBacks?.onFailed();
        }
    } catch (error) {
        yield put(getDataFailed(error));
        callBacks && callBacks?.onFailed && callBacks?.onFailed();
    }
}

///// DEMO SECTION
function* getSection(action: IAction<IGetSectionRequest>) {
    const { payload, callBacks } = action;
    try {
        const response: ResponseModel<PersonModel[]> = yield HomeRepository.getSection(payload?.sectionId!);
        if (response.statusCode === 200 && response.data) {
            yield put(getSectionSuccess(response.data, {
                sectionId: payload?.sectionId?.toString(),
                request: payload,
            }));
            callBacks && callBacks?.onSuccess && callBacks?.onSuccess();
        } else {
            yield put(getDataFailed(response.message));
            callBacks && callBacks?.onFailed && callBacks?.onFailed();
        }
    } catch (error) {
        yield put(getDataFailed(error));
        callBacks && callBacks?.onFailed && callBacks?.onFailed();
    }
}

function* getSectionMore(action: IAction<IGetSectionRequest>) {
    const { payload, callBacks } = action;
    try {
        const response: ResponseModel<PersonModel[]> = yield HomeRepository.getSectionLoadMore(payload?.sectionId!);
        if (response.statusCode === 200 && response.data) {
            yield put(getSectionSuccess(response.data, {
                sectionId: payload?.sectionId?.toString(),
                request: payload,
                isAppend: true,
                canLoadMore: processCanLoadMore(response?.data, payload?.pageSize),
            }));
        }
        callBacks && callBacks?.onSuccess && callBacks?.onSuccess();
    } catch (error) {
        yield put(getDataFailed(error));
        callBacks && callBacks?.onFailed && callBacks?.onFailed();
    }
}

export const homeSaga = function* () {
    yield all([
        takeLatest([getDataActionTypes.start, getDataActionTypes.listRefresh], getData),
        takeLatest([getDataActionTypes.listLoadMore], getDataMore),
        takeLatest([getSectionActionTypes.start, getSectionActionTypes.sectionRefresh], getSection),
        takeLatest([getSectionActionTypes.sectionLoadMore], getSectionMore),
    ]);
}