import { Form } from '../../form/model/form';

export class Document {
    id: number;
    title: string;
    body: string;
    form: Form;

    constructor(data: any) {
        data = data || {};
        this.id = data.id;
        this.title = data.title;
        this.body = data.body;
        this.form = data.form;
    }
}
