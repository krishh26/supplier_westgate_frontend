import { TestBed } from '@angular/core/testing';

import { FoiService } from './foi.service';

describe('FoiService', () => {
  let service: FoiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
