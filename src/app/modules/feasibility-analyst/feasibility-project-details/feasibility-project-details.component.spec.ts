import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeasibilityProjectDetailsComponent } from './feasibility-project-details.component';

describe('FeasibilityProjectDetailsComponent', () => {
  let component: FeasibilityProjectDetailsComponent;
  let fixture: ComponentFixture<FeasibilityProjectDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeasibilityProjectDetailsComponent]
    });
    fixture = TestBed.createComponent(FeasibilityProjectDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
