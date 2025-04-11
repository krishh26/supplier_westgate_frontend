import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRolesComponent } from './add-roles.component';

describe('AddRolesComponent', () => {
  let component: AddRolesComponent;
  let fixture: ComponentFixture<AddRolesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddRolesComponent]
    });
    fixture = TestBed.createComponent(AddRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
