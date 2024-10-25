import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminSupplierComponent } from './super-admin-supplier.component';

describe('SuperAdminSupplierComponent', () => {
  let component: SuperAdminSupplierComponent;
  let fixture: ComponentFixture<SuperAdminSupplierComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuperAdminSupplierComponent]
    });
    fixture = TestBed.createComponent(SuperAdminSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
