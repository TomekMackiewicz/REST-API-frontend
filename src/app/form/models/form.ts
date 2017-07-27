import { FormConfig } from './form-config';
import { Question } from './question';

export class Form {
    id: number;
    name: string;
    description: string;
    config: FormConfig;
    questions: Question[];

    constructor(data: any) {
        if (data) {
            this.id = data.id;
            this.name = data.name;
            this.description = data.description;
            this.config = new FormConfig(data.config);
            this.questions = [];
            data.questions.forEach(q => {
                this.questions.push(new Question(q));
            });
        }
    }
}
