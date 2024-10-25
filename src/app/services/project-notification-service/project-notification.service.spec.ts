import { TestBed } from '@angular/core/testing';

import { ProjectNotificationService } from './project-notification.service';

describe('ProjectNotificationService', () => {
  let service: ProjectNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
