import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsDetailsComponent } from './projects-details.component';

describe('ProjectsDetailsComponent', () => {
  let component: ProjectsDetailsComponent;
  let fixture: ComponentFixture<ProjectsDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectsDetailsComponent]
    });
    fixture = TestBed.createComponent(ProjectsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
