import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminProjectsAllComponent } from './super-admin-projects-all.component';

describe('SuperAdminProjectsAllComponent', () => {
  let component: SuperAdminProjectsAllComponent;
  let fixture: ComponentFixture<SuperAdminProjectsAllComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuperAdminProjectsAllComponent]
    });
    fixture = TestBed.createComponent(SuperAdminProjectsAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
