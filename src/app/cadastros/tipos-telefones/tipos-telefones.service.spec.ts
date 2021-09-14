import { TestBed } from '@angular/core/testing';

import { TiposTelefonesService } from './tipos-telefones.service';

describe('TiposTelefonesService', () => {
  let service: TiposTelefonesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiposTelefonesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
