/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FeasibilityService } from './feasibility.service';

describe('Service: Feasibility', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FeasibilityService]
    });
  });

  it('should ...', inject([FeasibilityService], (service: FeasibilityService) => {
    expect(service).toBeTruthy();
  }));
});
