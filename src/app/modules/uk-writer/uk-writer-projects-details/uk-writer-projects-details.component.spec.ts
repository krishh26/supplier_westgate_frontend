import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UkWriterProjectsDetailsComponent } from './uk-writer-projects-details.component';

describe('UkWriterProjectsDetailsComponent', () => {
  let component: UkWriterProjectsDetailsComponent;
  let fixture: ComponentFixture<UkWriterProjectsDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UkWriterProjectsDetailsComponent]
    });
    fixture = TestBed.createComponent(UkWriterProjectsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
