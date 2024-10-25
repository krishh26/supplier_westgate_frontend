import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BossUserProfileComponent } from './boss-user-profile.component';

describe('BossUserProfileComponent', () => {
  let component: BossUserProfileComponent;
  let fixture: ComponentFixture<BossUserProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BossUserProfileComponent]
    });
    fixture = TestBed.createComponent(BossUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
