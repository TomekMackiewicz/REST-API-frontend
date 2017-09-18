export class Category {
    name: string;

    constructor(data: any) {
        data = data || {};
        this.name = data.name;
    }
}
