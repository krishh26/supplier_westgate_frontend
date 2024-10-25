import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierHeaderComponent } from './supplier-header.component';

describe('SupplierHeaderComponent', () => {
  let component: SupplierHeaderComponent;
  let fixture: ComponentFixture<SupplierHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupplierHeaderComponent]
    });
    fixture = TestBed.createComponent(SupplierHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
