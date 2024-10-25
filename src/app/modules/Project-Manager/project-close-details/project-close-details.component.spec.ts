import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCloseDetailsComponent } from './project-close-details.component';

describe('ProjectCloseDetailsComponent', () => {
  let component: ProjectCloseDetailsComponent;
  let fixture: ComponentFixture<ProjectCloseDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectCloseDetailsComponent]
    });
    fixture = TestBed.createComponent(ProjectCloseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
