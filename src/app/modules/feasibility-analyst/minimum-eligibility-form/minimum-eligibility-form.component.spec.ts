import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinimumEligibilityFormComponent } from './minimum-eligibility-form.component';

describe('MinimumEligibilityFormComponent', () => {
  let component: MinimumEligibilityFormComponent;
  let fixture: ComponentFixture<MinimumEligibilityFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MinimumEligibilityFormComponent]
    });
    fixture = TestBed.createComponent(MinimumEligibilityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
