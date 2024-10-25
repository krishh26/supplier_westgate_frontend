import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailScreenshotAddEditComponent } from './mail-screenshot-add-edit.component';

describe('MailScreenshotAddEditComponent', () => {
  let component: MailScreenshotAddEditComponent;
  let fixture: ComponentFixture<MailScreenshotAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MailScreenshotAddEditComponent]
    });
    fixture = TestBed.createComponent(MailScreenshotAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
