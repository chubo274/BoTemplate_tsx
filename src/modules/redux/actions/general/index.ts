import { IAction } from "src/data/interfaces/common";
import { AppLanguage, changeAppLanguage } from "src/shared/localization";
import { CHANGE_LANGUAGE } from "../actionTypes";
import { createActionNormalTypes } from "../helper";

export const changeLanguageTypes = CHANGE_LANGUAGE;
export const changeLanguageActionTypes = createActionNormalTypes(changeLanguageTypes);

export const changeLanguage = (payload: AppLanguage): IAction<AppLanguage> => {
    changeAppLanguage(payload);
    return {
        type: changeLanguageActionTypes.success,
        payload
    }
};