import { TestBed } from '@angular/core/testing';

import { OficinaServiceService } from './oficina-service.service';

describe('OficinaServiceService', () => {
  let service: OficinaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OficinaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
