import { UserModel } from "src/data/models/UserModel";
import { StoreKey } from "src/shared/helpers/constant";
import { getLocal, IValueUpdate, removeLocal, setLocal, updateLocal } from "src/shared/helpers/function";

export const localStoreUserRepo = () => {
    const getUser = (): Promise<UserModel> => getLocal(StoreKey.User);

    const setUser = (data: UserModel): Promise<boolean> => setLocal(StoreKey.User, data);

    const updateUser = (data: IValueUpdate<UserModel>[]): Promise<boolean> => updateLocal(StoreKey.User, data);

    const removeUser = (): Promise<boolean> => removeLocal(StoreKey.User);

    return {
        getUser,
        setUser,
        updateUser,
        removeUser,
    }
}