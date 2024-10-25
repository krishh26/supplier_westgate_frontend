import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UkWriterHeaderComponent } from './uk-writer-header.component';

describe('UkWriterHeaderComponent', () => {
  let component: UkWriterHeaderComponent;
  let fixture: ComponentFixture<UkWriterHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UkWriterHeaderComponent]
    });
    fixture = TestBed.createComponent(UkWriterHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
