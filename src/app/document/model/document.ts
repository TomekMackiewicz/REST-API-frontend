import { Form } from '../../form/models/form';

export class Document {
    id: number;
    title: string;
    body: string;
    form: Form;

    constructor(data: any) {
        data = data || {
            id: null,
            title: '',
            body: '',
            form: {
                id: null
            }            
        };
        this.id = data.id;
        this.title = data.title;
        this.body = data.body;
        this.form = data.form;
    }
}
