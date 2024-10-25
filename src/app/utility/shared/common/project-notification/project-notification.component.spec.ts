import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectNotificationComponent } from './project-notification.component';

describe('ProjectNotificationComponent', () => {
  let component: ProjectNotificationComponent;
  let fixture: ComponentFixture<ProjectNotificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectNotificationComponent]
    });
    fixture = TestBed.createComponent(ProjectNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
