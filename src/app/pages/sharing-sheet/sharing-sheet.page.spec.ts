import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharingSheetPage } from './sharing-sheet.page';

describe('SharingSheetPage', () => {
  let component: SharingSheetPage;
  let fixture: ComponentFixture<SharingSheetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharingSheetPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharingSheetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
