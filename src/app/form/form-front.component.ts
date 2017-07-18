import { Component, OnInit } from '@angular/core';

import { FormService } from '../services/form.service';
import { FormHelperService } from '../services/form-helper.service';
import { Option, Question, Form, FormConfig } from './models/index';

@Component({
  selector: 'app-form',
  templateUrl: './form-front.component.html',
  //styleUrls: ['./form.component.css'],
  providers: [ FormService ]
})
export class FormFrontComponent implements OnInit {
  forms: any[];
  form: Form = new Form(null);
  mode = 'form';
  formName: string;
  config: FormConfig = {
    'allowBack': true,
    'allowReview': true,
    'autoMove': false,  // if true, it will move to next question automatically when answered.
    'duration': 0,  // indicates the time in which form needs to be completed. 0 means unlimited.
    'pageSize': 1,
    'requiredAll': false,  // indicates if you must answer all the questions before submitting.
    'richText': false,
    'shuffleQuestions': false,
    'shuffleOptions': false,
    'showClock': false,
    'showPager': true,
    'theme': 'none'
  };

  pager = {
    index: 0,
    size: 1,
    count: 1
  };

  constructor(private formService: FormService) { }

  ngOnInit() {
    this.forms = this.formService.getAll();
    this.formName = this.forms[0].id;
    this.loadForm(this.formName);
  }

  loadForm(formName: string) {
    this.formService.get(formName).subscribe(res => {
      this.form = new Form(res);
      this.pager.count = this.form.questions.length;
    });
    this.mode = 'form';
  }

  get filteredQuestions() {
    return (this.form.questions) ?
      this.form.questions.slice(this.pager.index, this.pager.index + this.pager.size) : [];
  }

  onSelect(question: Question, option: Option) {
    if (question.questionTypeId === 1) {
      question.options.forEach((x) => { if (x.id !== option.id) x.selected = false; });
    }

    if (this.config.autoMove) {
      this.goTo(this.pager.index + 1);
    }
  }

  goTo(index: number) {
    if (index >= 0 && index < this.pager.count) {
      this.pager.index = index;
      this.mode = 'form';
    }
  }

  isAnswered(question: Question) {
    return question.options.find(x => x.selected) ? 'Answered' : 'Not Answered';
  };

  isCorrect(question: Question) {
    return question.options.every(x => x.selected === x.isAnswer) ? 'correct' : 'wrong';
  };

  onSubmit() {
    let answers = [];
    this.form.questions.forEach(x => answers.push({ 'formId': this.form.id, 'questionId': x.id, 'answered': x.answered }));

    // Post your data to the server here. answers contains the questionId and the users' answer.
    console.log(this.form.questions);
    this.mode = 'result';
  }
}