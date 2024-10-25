import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminProjectDetailsComponent } from './super-admin-project-details.component';

describe('SuperAdminProjectDetailsComponent', () => {
  let component: SuperAdminProjectDetailsComponent;
  let fixture: ComponentFixture<SuperAdminProjectDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuperAdminProjectDetailsComponent]
    });
    fixture = TestBed.createComponent(SuperAdminProjectDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
