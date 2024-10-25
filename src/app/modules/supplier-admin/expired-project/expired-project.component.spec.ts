import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiredProjectComponent } from './expired-project.component';

describe('ExpiredProjectComponent', () => {
  let component: ExpiredProjectComponent;
  let fixture: ComponentFixture<ExpiredProjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpiredProjectComponent]
    });
    fixture = TestBed.createComponent(ExpiredProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
