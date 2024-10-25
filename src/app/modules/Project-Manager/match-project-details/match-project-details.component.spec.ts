import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchProjectDetailsComponent } from './match-project-details.component';

describe('MatchProjectDetailsComponent', () => {
  let component: MatchProjectDetailsComponent;
  let fixture: ComponentFixture<MatchProjectDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatchProjectDetailsComponent]
    });
    fixture = TestBed.createComponent(MatchProjectDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
