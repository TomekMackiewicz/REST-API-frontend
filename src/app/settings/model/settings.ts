export class Settings {
    price: number;
    transition: string;

    constructor(data: any) {
        data = data || {};
        this.price = data.price;
        this.transition = data.transition;
    }
}
