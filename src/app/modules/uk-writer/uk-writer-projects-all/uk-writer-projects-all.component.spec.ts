import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UkWriterProjectsAllComponent } from './uk-writer-projects-all.component';

describe('UkWriterProjectsAllComponent', () => {
  let component: UkWriterProjectsAllComponent;
  let fixture: ComponentFixture<UkWriterProjectsAllComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UkWriterProjectsAllComponent]
    });
    fixture = TestBed.createComponent(UkWriterProjectsAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
