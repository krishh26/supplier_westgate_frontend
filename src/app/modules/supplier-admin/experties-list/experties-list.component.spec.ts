import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertiesListComponent } from './experties-list.component';

describe('ExpertiesListComponent', () => {
  let component: ExpertiesListComponent;
  let fixture: ComponentFixture<ExpertiesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpertiesListComponent]
    });
    fixture = TestBed.createComponent(ExpertiesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
