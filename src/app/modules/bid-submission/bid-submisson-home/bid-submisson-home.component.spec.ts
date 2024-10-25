import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BidSubmissonHomeComponent } from './bid-submisson-home.component';

describe('BidSubmissonHomeComponent', () => {
  let component: BidSubmissonHomeComponent;
  let fixture: ComponentFixture<BidSubmissonHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BidSubmissonHomeComponent]
    });
    fixture = TestBed.createComponent(BidSubmissonHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
