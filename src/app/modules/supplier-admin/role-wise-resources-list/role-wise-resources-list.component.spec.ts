import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleWiseResourcesListComponent } from './role-wise-resources-list.component';

describe('RoleWiseResourcesListComponent', () => {
  let component: RoleWiseResourcesListComponent;
  let fixture: ComponentFixture<RoleWiseResourcesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoleWiseResourcesListComponent]
    });
    fixture = TestBed.createComponent(RoleWiseResourcesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
