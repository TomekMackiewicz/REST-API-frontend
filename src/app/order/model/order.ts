export class Order {
    totalAmount: number;
    unitPrice: number;
    quantity: number;
    name: string;
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    language: string = "pl";

    constructor(data: any) {
        data = data || {};
        this.totalAmount = data.totalAmount;
        this.unitPrice = data.unitPrice;
        this.quantity = data.quantity;
        this.name = data.name;        
        this.email = data.email;
        this.phone = data.phone;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.language = data.language;
    }
}
