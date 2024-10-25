import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeasibilityLoginDetailsComponent } from './feasibility-login-details.component';

describe('FeasibilityLoginDetailsComponent', () => {
  let component: FeasibilityLoginDetailsComponent;
  let fixture: ComponentFixture<FeasibilityLoginDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeasibilityLoginDetailsComponent]
    });
    fixture = TestBed.createComponent(FeasibilityLoginDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
