import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierMyProjectsComponent } from './supplier-my-projects.component';

describe('SupplierMyProjectsComponent', () => {
  let component: SupplierMyProjectsComponent;
  let fixture: ComponentFixture<SupplierMyProjectsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupplierMyProjectsComponent]
    });
    fixture = TestBed.createComponent(SupplierMyProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
