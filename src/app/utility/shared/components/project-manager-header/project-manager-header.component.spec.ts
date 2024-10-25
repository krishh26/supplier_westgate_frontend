import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectManagerHeaderComponent } from './project-manager-header.component';

describe('ProjectManagerHeaderComponent', () => {
  let component: ProjectManagerHeaderComponent;
  let fixture: ComponentFixture<ProjectManagerHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectManagerHeaderComponent]
    });
    fixture = TestBed.createComponent(ProjectManagerHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
