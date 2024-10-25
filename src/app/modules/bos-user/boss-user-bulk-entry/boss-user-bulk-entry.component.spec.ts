import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BossUserBulkEntryComponent } from './boss-user-bulk-entry.component';

describe('BossUserBulkEntryComponent', () => {
  let component: BossUserBulkEntryComponent;
  let fixture: ComponentFixture<BossUserBulkEntryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BossUserBulkEntryComponent]
    });
    fixture = TestBed.createComponent(BossUserBulkEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
