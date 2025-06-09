/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SupplieradminCommentModalComponentComponent } from './supplieradminCommentModalComponent.component';

describe('SupplieradminCommentModalComponentComponent', () => {
  let component: SupplieradminCommentModalComponentComponent;
  let fixture: ComponentFixture<SupplieradminCommentModalComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplieradminCommentModalComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplieradminCommentModalComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
