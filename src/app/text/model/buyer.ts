export class Buyer {
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    language: string = "pl";

    constructor(data: any) {
        data = data || {};
        this.email = data.email;
        this.phone = data.phone;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.language = data.language;
    }
}
