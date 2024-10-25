import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectManagerMatchProjectListComponent } from './project-manager-match-project-list.component';

describe('ProjectManagerMatchProjectListComponent', () => {
  let component: ProjectManagerMatchProjectListComponent;
  let fixture: ComponentFixture<ProjectManagerMatchProjectListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectManagerMatchProjectListComponent]
    });
    fixture = TestBed.createComponent(ProjectManagerMatchProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
