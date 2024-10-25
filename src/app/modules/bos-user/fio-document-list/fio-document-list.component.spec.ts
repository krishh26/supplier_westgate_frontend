import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FioDocumentListComponent } from './fio-document-list.component';

describe('FioDocumentListComponent', () => {
  let component: FioDocumentListComponent;
  let fixture: ComponentFixture<FioDocumentListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FioDocumentListComponent]
    });
    fixture = TestBed.createComponent(FioDocumentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
