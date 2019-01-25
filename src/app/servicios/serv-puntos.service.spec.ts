import { TestBed } from '@angular/core/testing';

import { ServPuntosService } from './serv-puntos.service';

describe('ServPuntosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServPuntosService = TestBed.get(ServPuntosService);
    expect(service).toBeTruthy();
  });
});
