import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BidProjectsDetailsComponent } from './bid-projects-details.component';

describe('BidProjectsDetailsComponent', () => {
  let component: BidProjectsDetailsComponent;
  let fixture: ComponentFixture<BidProjectsDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BidProjectsDetailsComponent]
    });
    fixture = TestBed.createComponent(BidProjectsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
