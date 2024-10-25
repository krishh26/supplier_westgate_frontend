/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BidSubmissionService } from './bid-submission.service';

describe('Service: BidSubmission', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BidSubmissionService]
    });
  });

  it('should ...', inject([BidSubmissionService], (service: BidSubmissionService) => {
    expect(service).toBeTruthy();
  }));
});
