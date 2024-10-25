import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCoOrdinatorHomeComponent } from './project-co-ordinator-home.component';

describe('ProjectCoOrdinatorHomeComponent', () => {
  let component: ProjectCoOrdinatorHomeComponent;
  let fixture: ComponentFixture<ProjectCoOrdinatorHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectCoOrdinatorHomeComponent]
    });
    fixture = TestBed.createComponent(ProjectCoOrdinatorHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
