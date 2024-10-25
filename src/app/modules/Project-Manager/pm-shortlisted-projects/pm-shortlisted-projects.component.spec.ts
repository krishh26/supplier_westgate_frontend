import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmShortlistedProjectsComponent } from './pm-shortlisted-projects.component';

describe('PmShortlistedProjectsComponent', () => {
  let component: PmShortlistedProjectsComponent;
  let fixture: ComponentFixture<PmShortlistedProjectsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PmShortlistedProjectsComponent]
    });
    fixture = TestBed.createComponent(PmShortlistedProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
