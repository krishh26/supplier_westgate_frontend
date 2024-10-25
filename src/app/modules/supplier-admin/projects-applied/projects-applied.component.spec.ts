import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsAppliedComponent } from './projects-applied.component';

describe('ProjectsAppliedComponent', () => {
  let component: ProjectsAppliedComponent;
  let fixture: ComponentFixture<ProjectsAppliedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectsAppliedComponent]
    });
    fixture = TestBed.createComponent(ProjectsAppliedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
