export class Order {
    id: number;
    amount: number;
    paymentInstruction: string;

    constructor(data: any) {
        data = data || {};
        this.id = data.id;
        this.amount = data.amount;
        this.paymentInstruction = data.paymentInstruction;
    }
}
