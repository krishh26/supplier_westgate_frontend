import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcesCommentModalComponent } from './resources-comment-modal.component';

describe('ResourcesCommentModalComponent', () => {
  let component: ResourcesCommentModalComponent;
  let fixture: ComponentFixture<ResourcesCommentModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResourcesCommentModalComponent]
    });
    fixture = TestBed.createComponent(ResourcesCommentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
