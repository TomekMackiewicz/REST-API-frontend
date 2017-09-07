export class Product {
    name: string;
    unitPrice: number;
    quantity: number;

    constructor(data: any) {
        data = data || {};
        this.name = data.name;
        this.unitPrice = data.unitPrice;
        this.quantity = data.quantity;
    }
}
