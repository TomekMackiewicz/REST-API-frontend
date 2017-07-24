export class Answer {
    label: number;    
    answer: string;

    constructor(data: any) {
        data = data || {};
        this.label = data.label;        
        this.answer = data.answer;
    }
}
