export class Settings {
    invoiceDisabled: boolean;

    constructor(data: any) {
        data = data || {};
        this.invoiceDisabled = data.invoiceDisabled;
    }
}
