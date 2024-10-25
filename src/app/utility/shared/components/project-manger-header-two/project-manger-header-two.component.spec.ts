import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectMangerHeaderTwoComponent } from './project-manger-header-two.component';

describe('ProjectMangerHeaderTwoComponent', () => {
  let component: ProjectMangerHeaderTwoComponent;
  let fixture: ComponentFixture<ProjectMangerHeaderTwoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectMangerHeaderTwoComponent]
    });
    fixture = TestBed.createComponent(ProjectMangerHeaderTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
