import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmCaseStudiesComponent } from './pm-case-studies.component';

describe('PmCaseStudiesComponent', () => {
  let component: PmCaseStudiesComponent;
  let fixture: ComponentFixture<PmCaseStudiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PmCaseStudiesComponent]
    });
    fixture = TestBed.createComponent(PmCaseStudiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
