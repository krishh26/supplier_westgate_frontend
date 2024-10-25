import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UkWriterComponent } from './uk-writer.component';

describe('UkWriterComponent', () => {
  let component: UkWriterComponent;
  let fixture: ComponentFixture<UkWriterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UkWriterComponent]
    });
    fixture = TestBed.createComponent(UkWriterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
