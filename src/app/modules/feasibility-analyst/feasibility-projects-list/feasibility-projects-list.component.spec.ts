import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeasibilityProjectsListComponent } from './feasibility-projects-list.component';

describe('FeasibilityProjectsListComponent', () => {
  let component: FeasibilityProjectsListComponent;
  let fixture: ComponentFixture<FeasibilityProjectsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeasibilityProjectsListComponent]
    });
    fixture = TestBed.createComponent(FeasibilityProjectsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
