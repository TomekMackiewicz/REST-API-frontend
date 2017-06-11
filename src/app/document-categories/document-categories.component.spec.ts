import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentCategoriesComponent } from './document-categories.component';

describe('DocumentCategoriesComponent', () => {
  let component: DocumentCategoriesComponent;
  let fixture: ComponentFixture<DocumentCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
