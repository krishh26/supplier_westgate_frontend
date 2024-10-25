import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeasibilityAnalystComponent } from './feasibility-analyst.component';

describe('FeasibilityAnalystComponent', () => {
  let component: FeasibilityAnalystComponent;
  let fixture: ComponentFixture<FeasibilityAnalystComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeasibilityAnalystComponent]
    });
    fixture = TestBed.createComponent(FeasibilityAnalystComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
