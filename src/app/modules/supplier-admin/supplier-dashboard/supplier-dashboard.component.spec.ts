import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierDashboardComponent } from './supplier-dashboard.component';

describe('SupplierDashboardComponent', () => {
  let component: SupplierDashboardComponent;
  let fixture: ComponentFixture<SupplierDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupplierDashboardComponent]
    });
    fixture = TestBed.createComponent(SupplierDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
