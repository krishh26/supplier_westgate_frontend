import { TestBed } from '@angular/core/testing';

import { ProjectCoordinatorService } from './project-coordinator.service';

describe('ProjectCoordinatorService', () => {
  let service: ProjectCoordinatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectCoordinatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
