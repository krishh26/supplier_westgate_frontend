import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeasibilityProfileComponent } from './feasibility-profile.component';

describe('FeasibilityProfileComponent', () => {
  let component: FeasibilityProfileComponent;
  let fixture: ComponentFixture<FeasibilityProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeasibilityProfileComponent]
    });
    fixture = TestBed.createComponent(FeasibilityProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
