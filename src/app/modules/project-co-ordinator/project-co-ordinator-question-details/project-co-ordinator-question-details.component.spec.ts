import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCoOrdinatorQuestionDetailsComponent } from './project-co-ordinator-question-details.component';

describe('ProjectCoOrdinatorQuestionDetailsComponent', () => {
  let component: ProjectCoOrdinatorQuestionDetailsComponent;
  let fixture: ComponentFixture<ProjectCoOrdinatorQuestionDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectCoOrdinatorQuestionDetailsComponent]
    });
    fixture = TestBed.createComponent(ProjectCoOrdinatorQuestionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
