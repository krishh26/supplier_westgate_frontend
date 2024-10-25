/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ShortlistedSupplierProjectListComponent } from './shortlisted-supplier-project-list.component';

describe('ShortlistedSupplierProjectListComponent', () => {
  let component: ShortlistedSupplierProjectListComponent;
  let fixture: ComponentFixture<ShortlistedSupplierProjectListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShortlistedSupplierProjectListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortlistedSupplierProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
