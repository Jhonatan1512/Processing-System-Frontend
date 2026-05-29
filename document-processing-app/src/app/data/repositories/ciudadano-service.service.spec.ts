import { TestBed } from '@angular/core/testing';

import { CiudadanoServiceService } from './ciudadano-service.service';

describe('CiudadanoServiceService', () => {
  let service: CiudadanoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CiudadanoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
