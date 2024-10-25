import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeasibilityHeaderComponent } from './feasibility-header.component';

describe('FeasibilityHeaderComponent', () => {
  let component: FeasibilityHeaderComponent;
  let fixture: ComponentFixture<FeasibilityHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeasibilityHeaderComponent]
    });
    fixture = TestBed.createComponent(FeasibilityHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
