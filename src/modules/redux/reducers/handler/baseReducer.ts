import { IAction, IDictionary, IReducer } from "../../../../data/interfaces/common";
import { ActionStatus } from "../../../../shared/helpers/constant";
import {
    ACTION_LIST,
    ACTION_PREFIX, ACTION_SECTION, FAILED_ACTION, LOADMORE_ACTION, REFRESH_ACTION, SUCCESS_ACTION,
} from "../../actions/actionTypes";

export interface IBaseReducer<State, Action> {
    actionType: string;
    initialState: IReducer<State>;
    processFetching: (
        state: IReducer<State>,
        action: IAction<Action>
    ) => IReducer<State>;
    processSuccess: (
        state: IReducer<State>,
        action: IAction<Action>
    ) => IReducer<State>;
    processListSuccess: (
        state: IReducer<State[]>,
        action: IAction<Action[]>
    ) => IReducer<State[]>;
    processFailed: (
        state: IReducer<State>,
        action: IAction<Action>
    ) => IReducer<State>;
    reducer: (state: IReducer<State>, action: IAction<Action>) => IReducer<State>;
    // Replace whole process of class
    customProcess?: (
        state: IReducer<State>,
        action: IAction<Action>
    ) => IReducer<State>;
    // Run after process of class
    extraProcess?: (
        state: IReducer<State>,
        action: IAction<Action>
    ) => IReducer<State>;
    convertActionDataToReducer: (data?: Action) => State | undefined;
}

export default class BaseReducer<State, Action>
    implements IBaseReducer<State, Action>
{
    customProcess?: (
        state: IReducer<State>,
        action: IAction<Action>
    ) => IReducer<State>;
    extraProcess?: (
        state: IReducer<State>,
        action: IAction<Action>
    ) => IReducer<State>;
    initialState: IReducer<State>;
    actionType: string;

    constructor(
        actionType: string,
        initialState?: IReducer<State>,
        extraProcess?: (
            state: IReducer<State>,
            action: IAction<Action>
        ) => IReducer<State>,
        customProcess?: (
            state: IReducer<State>,
            action: IAction<Action>
        ) => IReducer<State>
    ) {
        this.actionType = actionType;
        this.initialState = initialState ?? {
            isFetching: false,
            params: undefined,
            data: undefined,
            errorMessage: undefined,
            error: undefined,
            success: false,
            actionType: "",
            status: ActionStatus.None,
        };
        this.customProcess = customProcess;
        this.extraProcess = extraProcess;
    }

    private process = (
        state = this.initialState,
        action: IAction<Action>
    ): IReducer<State> => {
        if (this.customProcess) return this.customProcess(state, action);
        const actionType = action.type;

        if (actionType.includes(this.actionType)) {
            if (
                actionType.endsWith(ACTION_PREFIX) ||
                actionType.endsWith(REFRESH_ACTION) ||
                actionType.endsWith(LOADMORE_ACTION)
            ) {
                return this.processFetching(state, action);
            }
            if (actionType.endsWith(FAILED_ACTION)) {
                return this.processFailed(state, action);
            }

            if (actionType.endsWith(SUCCESS_ACTION)) {
                if (actionType.startsWith(ACTION_LIST)) {
                    //@ts-ignore
                    return this.processListSuccess(state, action);
                }
                if (actionType.startsWith(ACTION_SECTION)) {
                    //@ts-ignore
                    return this.processSectionSuccess(state, action);
                }
                return this.processSuccess(state, action);
            }
        }
        if (this.extraProcess) return this.extraProcess(state, action);
        return state;
    };

    convertActionDataToReducer = (data?: Action): State | undefined => {
        return data as unknown as State;
    };

    convertActionListDataToReducer = (data?: Action[]): State[] | undefined => {
        return data as unknown as State[];
    };

    processFetching = (
        state: IReducer<State>,
        action: IAction<any>
    ): IReducer<State> => {
        return {
            ...state,
            status:
                action.params && action.params.refresh
                    ? ActionStatus.Refreshing
                    : ActionStatus.Fetching,
            isFetching: true,
            params: {
                ...state.params,
                request: action.payload
            },
            errorMessage: undefined,
            success: false,
            actionType: action.type,
        };
    };

    processFailed = (
        state: IReducer<State>,
        action: IAction<any>
    ): IReducer<State> => {
        return {
            ...state,
            status: ActionStatus.Done,
            isFetching: false,
            errorMessage: action.payload?.message,
            error: action.payload?.rawError,
            success: false,
            actionType: action.type,
        };
    };

    processSuccess = (
        state: IReducer<State>,
        action: IAction<any>
    ): IReducer<State> => {
        return {
            ...state,
            status: ActionStatus.Done,
            isFetching: false,
            data: this.convertActionDataToReducer(action.payload),
            errorMessage: undefined,
            success: true,
            actionType: action.type,
        };
    };

    processListSuccess = (state: IReducer<State[]>, action: IAction<Action[]>): IReducer<State[]> => {
        let newData = state.data && Array.isArray(state.data) ? [...state.data] : [];
        const payload = action.payload!;
        const isAppend = action.params?.isAppend;
        const canLoadMore = action?.params?.canLoadMore !== undefined ? action.params.canLoadMore : true;

        if (isAppend) {
            newData = newData.concat(this.convertActionListDataToReducer(payload)!);
        } else {
            newData = this.convertActionListDataToReducer(payload)!;
        }

        return {
            ...state,
            status: ActionStatus.Done,
            isFetching: false,
            data: newData,
            errorMessage: undefined,
            success: true,
            actionType: action.type,
            params: {
                ...state.params,
                canLoadMore: canLoadMore
            }
        };
    };

    processSectionSuccess = (state: IReducer<IDictionary<State[]>>, action: IAction<Action[]>): IReducer<IDictionary<State[]>> => {
        let newData = state.data && Array.isArray(state.data) ? [...state.data] : [];
        const payload = action.payload!;
        const isAppend = action.params?.isAppend;
        const sectionId = action.params?.sectionId;
        const canLoadMore = action?.params?.canLoadMore !== undefined ? action.params.canLoadMore : true;

        if (isAppend) {
            newData = newData.concat(this.convertActionListDataToReducer(payload)!);
        } else {
            newData = this.convertActionListDataToReducer(payload)!;
        }

        return {
            ...state,
            status: ActionStatus.Done,
            isFetching: false,
            data: { ...state.data, [sectionId!]: newData },
            errorMessage: undefined,
            success: true,
            actionType: action.type,
            params: {
                ...state.params,
                canLoadMore: {
                    // @ts-ignore
                    ...state.params.canLoadMore,
                    [sectionId!]: canLoadMore
                }
            }
        };
    };

    reducer = (state: IReducer<State>, action: IAction<any>): IReducer<State> => {
        return this.process(state, action);
    };
}
