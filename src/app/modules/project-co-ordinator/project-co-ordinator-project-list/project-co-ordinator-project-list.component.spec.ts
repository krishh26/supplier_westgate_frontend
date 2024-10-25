import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCoOrdinatorProjectListComponent } from './project-co-ordinator-project-list.component';

describe('ProjectCoOrdinatorProjectListComponent', () => {
  let component: ProjectCoOrdinatorProjectListComponent;
  let fixture: ComponentFixture<ProjectCoOrdinatorProjectListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectCoOrdinatorProjectListComponent]
    });
    fixture = TestBed.createComponent(ProjectCoOrdinatorProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
