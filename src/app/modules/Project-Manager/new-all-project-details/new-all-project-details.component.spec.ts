import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAllProjectDetailsComponent } from './new-all-project-details.component';

describe('NewAllProjectDetailsComponent', () => {
  let component: NewAllProjectDetailsComponent;
  let fixture: ComponentFixture<NewAllProjectDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewAllProjectDetailsComponent]
    });
    fixture = TestBed.createComponent(NewAllProjectDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
