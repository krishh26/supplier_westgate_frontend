import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCordinatorProfileComponent } from './project-cordinator-profile.component';

describe('ProjectCordinatorProfileComponent', () => {
  let component: ProjectCordinatorProfileComponent;
  let fixture: ComponentFixture<ProjectCordinatorProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectCordinatorProfileComponent]
    });
    fixture = TestBed.createComponent(ProjectCordinatorProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
