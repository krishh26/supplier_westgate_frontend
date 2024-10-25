import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProjectDetailsComponent } from './all-project-details.component';

describe('AllProjectDetailsComponent', () => {
  let component: AllProjectDetailsComponent;
  let fixture: ComponentFixture<AllProjectDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllProjectDetailsComponent]
    });
    fixture = TestBed.createComponent(AllProjectDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
