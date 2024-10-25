import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDocumentComponent } from './view-document.component';

describe('ViewDocumentComponent', () => {
  let component: ViewDocumentComponent;
  let fixture: ComponentFixture<ViewDocumentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewDocumentComponent]
    });
    fixture = TestBed.createComponent(ViewDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
