import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UkWriterProfileComponent } from './uk-writer-profile.component';

describe('UkWriterProfileComponent', () => {
  let component: UkWriterProfileComponent;
  let fixture: ComponentFixture<UkWriterProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UkWriterProfileComponent]
    });
    fixture = TestBed.createComponent(UkWriterProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
