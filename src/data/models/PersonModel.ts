export class PersonModel {
    id: number;
    userId: number;
    name: string;
    age?: number;

    constructor(id: number, userId: number, name: string, age?: number) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.age = age;
    }

    static parseFromJson = (data: any) => {
        const obj = new PersonModel(0, 0, '');
        const { id, userId, name, age } = data;

        obj.id = id;
        obj.userId = userId;
        obj.name = name;
        obj.age = age;

        return obj;
    }
}