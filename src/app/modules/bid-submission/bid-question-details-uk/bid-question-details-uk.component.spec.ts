import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BidQuestionDetailsUkComponent } from './bid-question-details-uk.component';

describe('BidQuestionDetailsUkComponent', () => {
  let component: BidQuestionDetailsUkComponent;
  let fixture: ComponentFixture<BidQuestionDetailsUkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BidQuestionDetailsUkComponent]
    });
    fixture = TestBed.createComponent(BidQuestionDetailsUkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
