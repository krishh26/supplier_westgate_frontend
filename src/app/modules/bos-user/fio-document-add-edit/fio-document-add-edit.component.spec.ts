import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FioDocumentAddEditComponent } from './fio-document-add-edit.component';

describe('FioDocumentAddEditComponent', () => {
  let component: FioDocumentAddEditComponent;
  let fixture: ComponentFixture<FioDocumentAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FioDocumentAddEditComponent]
    });
    fixture = TestBed.createComponent(FioDocumentAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
