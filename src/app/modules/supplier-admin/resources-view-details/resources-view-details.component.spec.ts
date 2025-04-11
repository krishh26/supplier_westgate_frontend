import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcesViewDetailsComponent } from './resources-view-details.component';

describe('ResourcesViewDetailsComponent', () => {
  let component: ResourcesViewDetailsComponent;
  let fixture: ComponentFixture<ResourcesViewDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResourcesViewDetailsComponent]
    });
    fixture = TestBed.createComponent(ResourcesViewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
