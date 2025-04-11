import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRolesComponent } from './edit-roles.component';

describe('EditRolesComponent', () => {
  let component: EditRolesComponent;
  let fixture: ComponentFixture<EditRolesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditRolesComponent]
    });
    fixture = TestBed.createComponent(EditRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
