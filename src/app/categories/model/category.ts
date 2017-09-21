import { Form } from '../../form/model/form';

export class Category {
    id: number;
    name: string;
    forms: Array<Form>;

    constructor(data: any) {
        data = data || {};
        this.id = data.id;
        this.name = data.name;
        this.forms = data.forms;
    }
}
