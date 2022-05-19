import { isArray } from "lodash";
import { urls } from "../../api/resource";

import ResponseModel from "../../models/common/responseModel";
import { PersonModel } from "../../models/PersonModel";

const dataSectionOfAlice = [
    {
        "id": 1,
        "userId": 1,
        "name": "Alice's father"
    },
    {
        "id": 2,
        "userId": 1,
        "name": "Alice's mom"
    },
];

const dataSectionOfAlice2 = [
    {
        "id": 3,
        "userId": 1,
        "name": "Alice's sister"
    }
];

export const getSectionRepo = () => {
    /////////// FAKE DATA SECTION
    const getSection = async (id: number): Promise<ResponseModel<PersonModel[]>> => {
        const response = ResponseModel.createSuccess(dataSectionOfAlice);
        if (response && response?.statusCode === 200 && !response.isError && id === 1) {
            const responseParsed = isArray(response?.data) ? response?.data.map((el: any) => PersonModel.parseFromJson(el)) : [];
            return ResponseModel.createSuccess(responseParsed);
        } else {
            return ResponseModel.createError(
                400,
                "400",
                response.message,
                response.rawError
            );
        }
    };

    const getSectionLoadMore = async (id: number): Promise<ResponseModel<PersonModel[]>> => {
        const response = ResponseModel.createSuccess(dataSectionOfAlice2);
        if (response && response?.statusCode === 200 && !response.isError && id === 1) {
            const responseParsed = isArray(response?.data) ? response?.data.map((el: any) => PersonModel.parseFromJson(el)) : [];
            return ResponseModel.createSuccess(responseParsed);
        } else {
            return ResponseModel.createError(
                400,
                "400",
                response.message,
                response.rawError
            );
        }
    };

    return {
        getSection,
        getSectionLoadMore,
    }
}