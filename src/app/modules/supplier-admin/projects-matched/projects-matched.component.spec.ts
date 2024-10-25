import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsMatchedComponent } from './projects-matched.component';

describe('ProjectsMatchedComponent', () => {
  let component: ProjectsMatchedComponent;
  let fixture: ComponentFixture<ProjectsMatchedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectsMatchedComponent]
    });
    fixture = TestBed.createComponent(ProjectsMatchedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
