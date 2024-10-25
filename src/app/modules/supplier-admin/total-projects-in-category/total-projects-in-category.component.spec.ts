import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalProjectsInCategoryComponent } from './total-projects-in-category.component';

describe('TotalProjectsInCategoryComponent', () => {
  let component: TotalProjectsInCategoryComponent;
  let fixture: ComponentFixture<TotalProjectsInCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TotalProjectsInCategoryComponent]
    });
    fixture = TestBed.createComponent(TotalProjectsInCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
