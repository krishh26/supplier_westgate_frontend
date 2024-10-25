import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierAdminProjectListingComponent } from './supplier-admin-project-listing.component';

describe('SupplierAdminProjectListingComponent', () => {
  let component: SupplierAdminProjectListingComponent;
  let fixture: ComponentFixture<SupplierAdminProjectListingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupplierAdminProjectListingComponent]
    });
    fixture = TestBed.createComponent(SupplierAdminProjectListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
