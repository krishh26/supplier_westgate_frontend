import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubExpertiesListComponent } from './sub-experties-list.component';

describe('SubExpertiesListComponent', () => {
  let component: SubExpertiesListComponent;
  let fixture: ComponentFixture<SubExpertiesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubExpertiesListComponent]
    });
    fixture = TestBed.createComponent(SubExpertiesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
