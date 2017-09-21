export class FormConfig {
    allowBack: boolean = true;
    showPager: boolean = true;

    constructor(data: any) {
        data = data || {};
        this.allowBack = true;
        this.showPager = true;
    }
}
