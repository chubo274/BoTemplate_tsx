import { isArray } from "lodash";
import ResponseModel from "src/data/models/common/responseModel";
import { PersonModel } from "src/data/models/PersonModel";
import { urls } from "../../../api/resource";

const data = [
    {
        "id": 1,
        "userId": 101,
        "name": "Alice"
    },
    {
        "id": 2,
        "userId": 102,
        "name": "Bob"
    },
    {
        "id": 3,
        "userId": 103,
        "name": "Carol"
    }
];

const data2 = [
    {
        "id": 4,
        "userId": 103,
        "name": "not Alice"
    },
    {
        "id": 5,
        "userId": 104,
        "name": "not Bob"
    }
];

export const getDataRepo = () => {
    const getData = async (): Promise<ResponseModel<PersonModel[]>> => {
        // call api
        // const response = await apiGet(urls.getData); 
        const response = ResponseModel.createSuccess(data);
        if (response && response?.statusCode === 200 && !response.isError) {
            const responseParsed = isArray(response?.data) ? response?.data.map((el: any) => PersonModel.parseFromJson(el)) : [];
            return ResponseModel.createSuccess(responseParsed);
        } else {
            return ResponseModel.createError(
                response.statusCode,
                response.statusCode.toString(),
                response.message,
                response.rawError
            );
        }
    };

    const fakeGetDataLoadMore = async (): Promise<ResponseModel<PersonModel[]>> => {
        // call api
        // const response = await apiGet(urls.getData); 
        const response = ResponseModel.createSuccess(data2);
        if (response && response?.statusCode === 200 && !response.isError) {
            const responseParsed = isArray(response?.data) ? response?.data.map((el: any) => PersonModel.parseFromJson(el)) : [];
            return ResponseModel.createSuccess(responseParsed);
        } else {
            return ResponseModel.createError(
                response.statusCode,
                response.statusCode.toString(),
                response.message,
                response.rawError
            );
        }
    };

    return {
        getData,
        fakeGetDataLoadMore,
    }
}