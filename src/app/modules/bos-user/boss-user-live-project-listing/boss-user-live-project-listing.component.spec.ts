import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BossUserLiveProjectListingComponent } from './boss-user-live-project-listing.component';

describe('BossUserLiveProjectListingComponent', () => {
  let component: BossUserLiveProjectListingComponent;
  let fixture: ComponentFixture<BossUserLiveProjectListingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BossUserLiveProjectListingComponent]
    });
    fixture = TestBed.createComponent(BossUserLiveProjectListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
