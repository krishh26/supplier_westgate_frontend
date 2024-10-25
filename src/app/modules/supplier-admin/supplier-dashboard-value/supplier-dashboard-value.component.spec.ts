import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierDashboardValueComponent } from './supplier-dashboard-value.component';

describe('SupplierDashboardValueComponent', () => {
  let component: SupplierDashboardValueComponent;
  let fixture: ComponentFixture<SupplierDashboardValueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupplierDashboardValueComponent]
    });
    fixture = TestBed.createComponent(SupplierDashboardValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
