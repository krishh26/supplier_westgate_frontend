import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectManagerCloseProjectListComponent } from './project-manager-close-project-list.component';

describe('ProjectManagerCloseProjectListComponent', () => {
  let component: ProjectManagerCloseProjectListComponent;
  let fixture: ComponentFixture<ProjectManagerCloseProjectListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectManagerCloseProjectListComponent]
    });
    fixture = TestBed.createComponent(ProjectManagerCloseProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
