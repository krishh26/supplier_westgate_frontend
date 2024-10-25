import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UkWriterQuestionDetailsEditComponent } from './uk-writer-question-details-edit.component';

describe('UkWriterQuestionDetailsEditComponent', () => {
  let component: UkWriterQuestionDetailsEditComponent;
  let fixture: ComponentFixture<UkWriterQuestionDetailsEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UkWriterQuestionDetailsEditComponent]
    });
    fixture = TestBed.createComponent(UkWriterQuestionDetailsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
