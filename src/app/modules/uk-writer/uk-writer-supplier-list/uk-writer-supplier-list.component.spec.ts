import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UkWriterSupplierListComponent } from './uk-writer-supplier-list.component';

describe('UkWriterSupplierListComponent', () => {
  let component: UkWriterSupplierListComponent;
  let fixture: ComponentFixture<UkWriterSupplierListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UkWriterSupplierListComponent]
    });
    fixture = TestBed.createComponent(UkWriterSupplierListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
