import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminSupplierProjectViewComponent } from './super-admin-supplier-project-view.component';

describe('SuperAdminSupplierProjectViewComponent', () => {
  let component: SuperAdminSupplierProjectViewComponent;
  let fixture: ComponentFixture<SuperAdminSupplierProjectViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuperAdminSupplierProjectViewComponent]
    });
    fixture = TestBed.createComponent(SuperAdminSupplierProjectViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
