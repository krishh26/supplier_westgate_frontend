import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UkWriterQuestionDetailsComponent } from './uk-writer-question-details.component';

describe('UkWriterQuestionDetailsComponent', () => {
  let component: UkWriterQuestionDetailsComponent;
  let fixture: ComponentFixture<UkWriterQuestionDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UkWriterQuestionDetailsComponent]
    });
    fixture = TestBed.createComponent(UkWriterQuestionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
