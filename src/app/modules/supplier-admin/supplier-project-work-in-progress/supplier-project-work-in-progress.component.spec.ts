import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierProjectWorkInProgressComponent } from './supplier-project-work-in-progress.component';

describe('SupplierProjectWorkInProgressComponent', () => {
  let component: SupplierProjectWorkInProgressComponent;
  let fixture: ComponentFixture<SupplierProjectWorkInProgressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupplierProjectWorkInProgressComponent]
    });
    fixture = TestBed.createComponent(SupplierProjectWorkInProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
