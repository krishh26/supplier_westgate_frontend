import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BidSubmissionProfileComponent } from './bid-submission-profile.component';

describe('BidSubmissionProfileComponent', () => {
  let component: BidSubmissionProfileComponent;
  let fixture: ComponentFixture<BidSubmissionProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BidSubmissionProfileComponent]
    });
    fixture = TestBed.createComponent(BidSubmissionProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
