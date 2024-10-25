import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCoOrdinatorHeaderComponent } from './project-co-ordinator-header.component';

describe('ProjectCoOrdinatorHeaderComponent', () => {
  let component: ProjectCoOrdinatorHeaderComponent;
  let fixture: ComponentFixture<ProjectCoOrdinatorHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectCoOrdinatorHeaderComponent]
    });
    fixture = TestBed.createComponent(ProjectCoOrdinatorHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
