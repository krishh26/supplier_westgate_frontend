import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsAllComponent } from './projects-all.component';

describe('ProjectsAllComponent', () => {
  let component: ProjectsAllComponent;
  let fixture: ComponentFixture<ProjectsAllComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectsAllComponent]
    });
    fixture = TestBed.createComponent(ProjectsAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
