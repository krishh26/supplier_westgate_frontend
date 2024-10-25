import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCoOrdinatorDetailsComponent } from './project-co-ordinator-details.component';

describe('ProjectCoOrdinatorDetailsComponent', () => {
  let component: ProjectCoOrdinatorDetailsComponent;
  let fixture: ComponentFixture<ProjectCoOrdinatorDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectCoOrdinatorDetailsComponent]
    });
    fixture = TestBed.createComponent(ProjectCoOrdinatorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
