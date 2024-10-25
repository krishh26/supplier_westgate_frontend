/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UkWriterService } from './uk-writer.service';

describe('Service: UkWriter', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UkWriterService]
    });
  });

  it('should ...', inject([UkWriterService], (service: UkWriterService) => {
    expect(service).toBeTruthy();
  }));
});
