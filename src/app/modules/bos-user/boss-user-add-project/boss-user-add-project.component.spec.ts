import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BossUserAddProjectComponent } from './boss-user-add-project.component';

describe('BossUserAddProjectComponent', () => {
  let component: BossUserAddProjectComponent;
  let fixture: ComponentFixture<BossUserAddProjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BossUserAddProjectComponent]
    });
    fixture = TestBed.createComponent(BossUserAddProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
