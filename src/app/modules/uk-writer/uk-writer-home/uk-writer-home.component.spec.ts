import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UkWriterHomeComponent } from './uk-writer-home.component';

describe('UkWriterHomeComponent', () => {
  let component: UkWriterHomeComponent;
  let fixture: ComponentFixture<UkWriterHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UkWriterHomeComponent]
    });
    fixture = TestBed.createComponent(UkWriterHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
