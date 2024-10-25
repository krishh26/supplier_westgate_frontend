import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLoginDetailsComponent } from './add-login-details.component';

describe('AddLoginDetailsComponent', () => {
  let component: AddLoginDetailsComponent;
  let fixture: ComponentFixture<AddLoginDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddLoginDetailsComponent]
    });
    fixture = TestBed.createComponent(AddLoginDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
