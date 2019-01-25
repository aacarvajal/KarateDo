import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntosPage } from './puntos.page';

describe('PuntosPage', () => {
  let component: PuntosPage;
  let fixture: ComponentFixture<PuntosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuntosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuntosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
