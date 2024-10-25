import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BidQuestionDetailsComponent } from './bid-question-details.component';

describe('BidQuestionDetailsComponent', () => {
  let component: BidQuestionDetailsComponent;
  let fixture: ComponentFixture<BidQuestionDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BidQuestionDetailsComponent]
    });
    fixture = TestBed.createComponent(BidQuestionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
