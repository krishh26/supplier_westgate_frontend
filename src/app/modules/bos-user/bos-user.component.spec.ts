import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BOSUserComponent } from './bos-user.component';

describe('BOSUserComponent', () => {
  let component: BOSUserComponent;
  let fixture: ComponentFixture<BOSUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BOSUserComponent]
    });
    fixture = TestBed.createComponent(BOSUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
