import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliedProjectsDetailsComponent } from './applied-projects-details.component';

describe('AppliedProjectsDetailsComponent', () => {
  let component: AppliedProjectsDetailsComponent;
  let fixture: ComponentFixture<AppliedProjectsDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppliedProjectsDetailsComponent]
    });
    fixture = TestBed.createComponent(AppliedProjectsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
