import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BidHeaderComponent } from './bid-header.component';

describe('BidHeaderComponent', () => {
  let component: BidHeaderComponent;
  let fixture: ComponentFixture<BidHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BidHeaderComponent]
    });
    fixture = TestBed.createComponent(BidHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
