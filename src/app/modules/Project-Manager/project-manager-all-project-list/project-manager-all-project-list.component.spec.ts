import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectManagerAllProjectListComponent } from './project-manager-all-project-list.component';

describe('ProjectManagerAllProjectListComponent', () => {
  let component: ProjectManagerAllProjectListComponent;
  let fixture: ComponentFixture<ProjectManagerAllProjectListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectManagerAllProjectListComponent]
    });
    fixture = TestBed.createComponent(ProjectManagerAllProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
