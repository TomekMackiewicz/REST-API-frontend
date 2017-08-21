import { Option } from './option';

export class Question {
    id: number;
    name: string;
    questionType: string;
    validation: string; 
    required: boolean = true;   
    options: Option[];

    constructor(data: any) {
        data = data || {};
        this.id = data.id;
        this.name = data.name;
        this.questionType = data.questionType;
        this.validation = data.validation;
        this.required = data.required;
        this.options = [];
        data.options.forEach(o => {
            this.options.push(new Option(o));
        });
    }
}
