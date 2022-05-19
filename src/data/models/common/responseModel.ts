export default class ResponseModel<T> {
    code: string;
    statusCode: number;
    isError: boolean;
    message?: string;
    rawError?: any;
    data?: T;

    constructor(
        code = "",
        statusCode = 0,
        isError = false,
        message?: string,
        data?: T,
    ) {
        this.code = code;
        this.isError = isError;
        this.message = message;
        this.data = data;
        this.statusCode = statusCode;
    }

    static createSuccess(data: any): ResponseModel<any> {
        const response = new ResponseModel();
        response.data = data;
        response.isError = false;
        response.statusCode = 200;
        return response;
    }

    static createError(
        statusCode: number,
        code = "",
        message?: string,
        rawError?: any
    ): ResponseModel<any> {
        const response = new ResponseModel();
        response.isError = true;
        response.code = code;
        response.message = message;
        response.rawError = rawError;
        response.statusCode = statusCode;
        return response;
    }

    toString = () => {
        return this.message;
    };
}

export interface ResponseRecord<T> {
    data: T;
    totalRecord?: number;
}
