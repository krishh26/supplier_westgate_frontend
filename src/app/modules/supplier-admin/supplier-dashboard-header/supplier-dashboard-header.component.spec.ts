import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierDashboardHeaderComponent } from './supplier-dashboard-header.component';

describe('SupplierDashboardHeaderComponent', () => {
  let component: SupplierDashboardHeaderComponent;
  let fixture: ComponentFixture<SupplierDashboardHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupplierDashboardHeaderComponent]
    });
    fixture = TestBed.createComponent(SupplierDashboardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
