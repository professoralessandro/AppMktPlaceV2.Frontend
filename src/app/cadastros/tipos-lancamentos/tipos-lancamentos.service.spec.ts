import { TestBed } from '@angular/core/testing';

import { TiposLancamentosService } from './tipos-lancamentos.service';

describe('TiposLancamentosService', () => {
  let service: TiposLancamentosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiposLancamentosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
