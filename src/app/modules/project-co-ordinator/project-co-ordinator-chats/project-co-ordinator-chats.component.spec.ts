import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCoOrdinatorChatsComponent } from './project-co-ordinator-chats.component';

describe('ProjectCoOrdinatorChatsComponent', () => {
  let component: ProjectCoOrdinatorChatsComponent;
  let fixture: ComponentFixture<ProjectCoOrdinatorChatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectCoOrdinatorChatsComponent]
    });
    fixture = TestBed.createComponent(ProjectCoOrdinatorChatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
