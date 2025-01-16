import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenceNoticePageComponent } from './maintence-notice-page.component';

describe('MaintenceNoticePageComponent', () => {
  let component: MaintenceNoticePageComponent;
  let fixture: ComponentFixture<MaintenceNoticePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaintenceNoticePageComponent]
    });
    fixture = TestBed.createComponent(MaintenceNoticePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
