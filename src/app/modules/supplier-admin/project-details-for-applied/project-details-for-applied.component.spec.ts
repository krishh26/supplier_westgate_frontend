import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDetailsForAppliedComponent } from './project-details-for-applied.component';

describe('ProjectDetailsForAppliedComponent', () => {
  let component: ProjectDetailsForAppliedComponent;
  let fixture: ComponentFixture<ProjectDetailsForAppliedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectDetailsForAppliedComponent]
    });
    fixture = TestBed.createComponent(ProjectDetailsForAppliedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
