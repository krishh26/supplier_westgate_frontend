/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SuperadminService } from './superadmin.service';

describe('Service: Superadmin', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SuperadminService]
    });
  });

  it('should ...', inject([SuperadminService], (service: SuperadminService) => {
    expect(service).toBeTruthy();
  }));
});
