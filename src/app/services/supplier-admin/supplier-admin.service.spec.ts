/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SupplierAdminService } from './supplier-admin.service';

describe('Service: SupplierAdmin', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SupplierAdminService]
    });
  });

  it('should ...', inject([SupplierAdminService], (service: SupplierAdminService) => {
    expect(service).toBeTruthy();
  }));
});
