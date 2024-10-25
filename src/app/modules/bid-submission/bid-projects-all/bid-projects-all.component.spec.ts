import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BidProjectsAllComponent } from './bid-projects-all.component';

describe('BidProjectsAllComponent', () => {
  let component: BidProjectsAllComponent;
  let fixture: ComponentFixture<BidProjectsAllComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BidProjectsAllComponent]
    });
    fixture = TestBed.createComponent(BidProjectsAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
