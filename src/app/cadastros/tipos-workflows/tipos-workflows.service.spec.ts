import { TestBed } from '@angular/core/testing';

import { TiposWorkflowsService } from './tipos-workflows.service';

describe('TiposWorkflowsService', () => {
  let service: TiposWorkflowsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiposWorkflowsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
