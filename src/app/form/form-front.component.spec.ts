/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormFrontComponent } from './form-front.component';

describe('FormComponent', () => {
  let component: FormFrontComponent;
  let fixture: ComponentFixture<FormFrontComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormFrontComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
