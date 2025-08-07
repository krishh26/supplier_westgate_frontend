import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserDetailsComponent } from './view-user-details.component';

describe('ViewUserDetailsComponent', () => {
  let component: ViewUserDetailsComponent;
  let fixture: ComponentFixture<ViewUserDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewUserDetailsComponent]
    });
    fixture = TestBed.createComponent(ViewUserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
