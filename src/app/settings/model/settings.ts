export class Settings {
    price: number;

    constructor(data: any) {
        data = data || {};
        this.price = data.price;
    }
}
