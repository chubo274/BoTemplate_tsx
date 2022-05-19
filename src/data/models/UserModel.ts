export class UserModel {
    id: number;
    userName: number;
    name: string;
    token: string;
    refreshToken?: string;
    tokenType?: string;
    age?: number;

    constructor(id: number, userName: number, name: string, token: string, refreshToken?: string, tokenType?: string, age?: number) {
        this.id = id;
        this.userName = userName;
        this.name = name;
        this.token = token;
        this.refreshToken = refreshToken;
        this.tokenType = tokenType;
        this.age = age;
    }

    static parseFromJson = (data: any) => {
        const obj = new UserModel(0, 0, '', '');
        const { id_token, userName, name, access_token, refresh_token, token_type, age } = data;

        obj.id = id_token;
        obj.userName = userName;
        obj.name = name;
        obj.token = access_token;
        obj.refreshToken = refresh_token;
        obj.tokenType = token_type;
        obj.age = age;

        return obj;
    }
}