import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectMangerProfileComponent } from './project-manger-profile.component';

describe('ProjectMangerProfileComponent', () => {
  let component: ProjectMangerProfileComponent;
  let fixture: ComponentFixture<ProjectMangerProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectMangerProfileComponent]
    });
    fixture = TestBed.createComponent(ProjectMangerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
