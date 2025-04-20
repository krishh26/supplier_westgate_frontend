import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcesAddComponent } from './resources-add.component';

describe('ResourcesAddComponent', () => {
  let component: ResourcesAddComponent;
  let fixture: ComponentFixture<ResourcesAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResourcesAddComponent]
    });
    fixture = TestBed.createComponent(ResourcesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
