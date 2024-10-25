import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BidMatchedProjectsComponent } from './bid-matched-projects.component';

describe('BidMatchedProjectsComponent', () => {
  let component: BidMatchedProjectsComponent;
  let fixture: ComponentFixture<BidMatchedProjectsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BidMatchedProjectsComponent]
    });
    fixture = TestBed.createComponent(BidMatchedProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
