import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCaseStudyComponent } from './add-case-study.component';

describe('AddCaseStudyComponent', () => {
  let component: AddCaseStudyComponent;
  let fixture: ComponentFixture<AddCaseStudyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCaseStudyComponent]
    });
    fixture = TestBed.createComponent(AddCaseStudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
