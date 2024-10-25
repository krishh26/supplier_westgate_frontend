import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionAnswerDetailsComponent } from './question-answer-details.component';

describe('QuestionAnswerDetailsComponent', () => {
  let component: QuestionAnswerDetailsComponent;
  let fixture: ComponentFixture<QuestionAnswerDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionAnswerDetailsComponent]
    });
    fixture = TestBed.createComponent(QuestionAnswerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
