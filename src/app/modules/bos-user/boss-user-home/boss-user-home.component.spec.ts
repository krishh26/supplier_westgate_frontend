import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BossUserHomeComponent } from './boss-user-home.component';

describe('BossUserHomeComponent', () => {
  let component: BossUserHomeComponent;
  let fixture: ComponentFixture<BossUserHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BossUserHomeComponent]
    });
    fixture = TestBed.createComponent(BossUserHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
