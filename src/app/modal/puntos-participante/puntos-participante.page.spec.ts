import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntosParticipantePage } from './puntos-participante.page';

describe('PuntosParticipantePage', () => {
  let component: PuntosParticipantePage;
  let fixture: ComponentFixture<PuntosParticipantePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuntosParticipantePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuntosParticipantePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
