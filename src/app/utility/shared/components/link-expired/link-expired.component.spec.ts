import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkExpiredComponent } from './link-expired.component';

describe('LinkExpiredComponent', () => {
  let component: LinkExpiredComponent;
  let fixture: ComponentFixture<LinkExpiredComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LinkExpiredComponent]
    });
    fixture = TestBed.createComponent(LinkExpiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
