import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppilerAdminChatComponent } from './suppiler-admin-chat.component';

describe('SuppilerAdminChatComponent', () => {
  let component: SuppilerAdminChatComponent;
  let fixture: ComponentFixture<SuppilerAdminChatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuppilerAdminChatComponent]
    });
    fixture = TestBed.createComponent(SuppilerAdminChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
