import { TestBed } from '@angular/core/testing';

import { MailscreenshotService } from './mailscreenshot.service';

describe('MailscreenshotService', () => {
  let service: MailscreenshotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MailscreenshotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
