import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcesViewComponent } from './resources-view.component';

describe('ResourcesViewComponent', () => {
  let component: ResourcesViewComponent;
  let fixture: ComponentFixture<ResourcesViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResourcesViewComponent]
    });
    fixture = TestBed.createComponent(ResourcesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
