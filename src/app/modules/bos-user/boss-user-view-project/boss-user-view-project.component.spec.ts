import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BossUserViewProjectComponent } from './boss-user-view-project.component';

describe('BossUserViewProjectComponent', () => {
  let component: BossUserViewProjectComponent;
  let fixture: ComponentFixture<BossUserViewProjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BossUserViewProjectComponent]
    });
    fixture = TestBed.createComponent(BossUserViewProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
