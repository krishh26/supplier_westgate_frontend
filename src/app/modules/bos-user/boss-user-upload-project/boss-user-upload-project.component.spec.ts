import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BossUserUploadProjectComponent } from './boss-user-upload-project.component';

describe('BossUserUploadProjectComponent', () => {
  let component: BossUserUploadProjectComponent;
  let fixture: ComponentFixture<BossUserUploadProjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BossUserUploadProjectComponent]
    });
    fixture = TestBed.createComponent(BossUserUploadProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
