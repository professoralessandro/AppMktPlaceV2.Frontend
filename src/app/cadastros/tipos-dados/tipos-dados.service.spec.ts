import { TestBed } from '@angular/core/testing';

import { TiposDadosService } from './tipos-dados.service';

describe('TiposDadosService', () => {
  let service: TiposDadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiposDadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
