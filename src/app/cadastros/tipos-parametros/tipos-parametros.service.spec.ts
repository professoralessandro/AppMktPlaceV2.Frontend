import { TestBed } from '@angular/core/testing';

import { TiposParametrosService } from './tipos-parametros.service';

describe('TiposParametrosService', () => {
  let service: TiposParametrosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiposParametrosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
