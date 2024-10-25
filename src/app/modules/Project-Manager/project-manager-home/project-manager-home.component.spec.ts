import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectManagerHomeComponent } from './project-manager-home.component';

describe('ProjectManagerHomeComponent', () => {
  let component: ProjectManagerHomeComponent;
  let fixture: ComponentFixture<ProjectManagerHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectManagerHomeComponent]
    });
    fixture = TestBed.createComponent(ProjectManagerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
