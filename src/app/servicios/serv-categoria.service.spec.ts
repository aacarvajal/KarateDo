import { TestBed } from '@angular/core/testing';

import { ServCategoriaService } from './serv-categoria.service';

describe('ServCategoriaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServCategoriaService = TestBed.get(ServCategoriaService);
    expect(service).toBeTruthy();
  });
});
