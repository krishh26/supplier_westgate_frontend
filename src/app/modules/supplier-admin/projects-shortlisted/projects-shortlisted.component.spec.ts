import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsShortlistedComponent } from './projects-shortlisted.component';

describe('ProjectsShortlistedComponent', () => {
  let component: ProjectsShortlistedComponent;
  let fixture: ComponentFixture<ProjectsShortlistedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectsShortlistedComponent]
    });
    fixture = TestBed.createComponent(ProjectsShortlistedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
