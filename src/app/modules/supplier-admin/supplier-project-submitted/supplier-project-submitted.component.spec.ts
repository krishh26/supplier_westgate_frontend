import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierProjectSubmittedComponent } from './supplier-project-submitted.component';

describe('SupplierProjectSubmittedComponent', () => {
  let component: SupplierProjectSubmittedComponent;
  let fixture: ComponentFixture<SupplierProjectSubmittedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupplierProjectSubmittedComponent]
    });
    fixture = TestBed.createComponent(SupplierProjectSubmittedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
