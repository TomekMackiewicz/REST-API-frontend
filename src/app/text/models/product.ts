export class Product {
    name: string;
    unitPrice: string;
    quantity: string;

    constructor(data: any) {
        data = data || {};
        this.name = data.name;
        this.unitPrice = data.unitPrice;
        this.quantity = data.quantity;
    }
}
