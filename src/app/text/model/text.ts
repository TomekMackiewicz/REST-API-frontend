export class Text {
    id: number;
    title: string;
    body: string;
    token: number;
    addDate: Date;

    constructor(data: any) {
        data = data || {};
        this.id = data.id;
        this.title = data.title;
        this.body = data.body;
        this.token = data.token;
        this.addDate = data.addDate;
    }
}
