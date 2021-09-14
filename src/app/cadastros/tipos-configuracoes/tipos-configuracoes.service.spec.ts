import { TestBed } from '@angular/core/testing';

import { TiposConfiguracoesService } from './tipos-configuracoes.service';

describe('TiposConfiguracoesService', () => {
  let service: TiposConfiguracoesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiposConfiguracoesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
