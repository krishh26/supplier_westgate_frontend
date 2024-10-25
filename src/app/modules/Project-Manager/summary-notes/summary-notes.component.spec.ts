import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryNotesComponent } from './summary-notes.component';

describe('SummaryNotesComponent', () => {
  let component: SummaryNotesComponent;
  let fixture: ComponentFixture<SummaryNotesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SummaryNotesComponent]
    });
    fixture = TestBed.createComponent(SummaryNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
