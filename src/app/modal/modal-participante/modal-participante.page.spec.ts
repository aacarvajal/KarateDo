import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalParticipantePage } from './modal-participante.page';

describe('ModalParticipantePage', () => {
  let component: ModalParticipantePage;
  let fixture: ComponentFixture<ModalParticipantePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalParticipantePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalParticipantePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
