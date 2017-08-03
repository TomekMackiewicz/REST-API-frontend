import { FormConfig } from './form-config';
import { Question } from './question';
import { Category } from './category';

export class Form {
    id: number;
    name: string;
    description: string;
    config: FormConfig;
    questions: Question[];
    categories: Category[];

    constructor(data: any) {
        if (data) {
            this.id = data.id;
            this.name = data.name;
            this.description = data.description;
            this.config = new FormConfig(data.config);
            this.questions = [];
            this.categories = [];
            data.questions.forEach(q => {
                this.questions.push(new Question(q));
            });
            data.categories.forEach(c => {
                this.categories.push(new Category(c));
            });            
        }
    }
}
