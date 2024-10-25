import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UkWriterMatchedProjectsComponent } from './uk-writer-matched-projects.component';

describe('UkWriterMatchedProjectsComponent', () => {
  let component: UkWriterMatchedProjectsComponent;
  let fixture: ComponentFixture<UkWriterMatchedProjectsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UkWriterMatchedProjectsComponent]
    });
    fixture = TestBed.createComponent(UkWriterMatchedProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
