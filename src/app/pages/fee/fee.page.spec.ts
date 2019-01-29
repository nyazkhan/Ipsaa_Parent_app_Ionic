import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeePage } from './fee.page';

describe('FeePage', () => {
  let component: FeePage;
  let fixture: ComponentFixture<FeePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
