import { TestBed } from '@angular/core/testing';

import { TiposDocumentosService } from './tipos-documentos.service';

describe('TiposDocumentosService', () => {
  let service: TiposDocumentosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiposDocumentosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
