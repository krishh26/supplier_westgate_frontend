/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ShortlistedSupplierProjectDetailsComponent } from './shortlisted-supplier-project-details.component';

describe('ShortlistedSupplierProjectDetailsComponent', () => {
  let component: ShortlistedSupplierProjectDetailsComponent;
  let fixture: ComponentFixture<ShortlistedSupplierProjectDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShortlistedSupplierProjectDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortlistedSupplierProjectDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
