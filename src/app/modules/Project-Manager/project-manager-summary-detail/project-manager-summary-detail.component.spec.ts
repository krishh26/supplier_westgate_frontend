import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectManagerSummaryDetailComponent } from './project-manager-summary-detail.component';

describe('ProjectManagerSummaryDetailComponent', () => {
  let component: ProjectManagerSummaryDetailComponent;
  let fixture: ComponentFixture<ProjectManagerSummaryDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectManagerSummaryDetailComponent]
    });
    fixture = TestBed.createComponent(ProjectManagerSummaryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
