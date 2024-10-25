import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierAdminComponent } from './supplier-admin.component';

describe('SupplierAdminComponent', () => {
  let component: SupplierAdminComponent;
  let fixture: ComponentFixture<SupplierAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupplierAdminComponent]
    });
    fixture = TestBed.createComponent(SupplierAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
