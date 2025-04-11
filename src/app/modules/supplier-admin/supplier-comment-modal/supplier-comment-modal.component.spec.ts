import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierCommentModalComponent } from './supplier-comment-modal.component';

describe('SupplierCommentModalComponent', () => {
  let component: SupplierCommentModalComponent;
  let fixture: ComponentFixture<SupplierCommentModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupplierCommentModalComponent]
    });
    fixture = TestBed.createComponent(SupplierCommentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
