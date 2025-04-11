import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExpertiesComponent } from './add-experties.component';

describe('AddExpertiesComponent', () => {
  let component: AddExpertiesComponent;
  let fixture: ComponentFixture<AddExpertiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddExpertiesComponent]
    });
    fixture = TestBed.createComponent(AddExpertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
