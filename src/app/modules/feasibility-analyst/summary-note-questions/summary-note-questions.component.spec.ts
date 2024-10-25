import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryNoteQuestionsComponent } from './summary-note-questions.component';

describe('SummaryNoteQuestionsComponent', () => {
  let component: SummaryNoteQuestionsComponent;
  let fixture: ComponentFixture<SummaryNoteQuestionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SummaryNoteQuestionsComponent]
    });
    fixture = TestBed.createComponent(SummaryNoteQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
