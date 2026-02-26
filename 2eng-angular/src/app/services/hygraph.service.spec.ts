import { TestBed } from '@angular/core/testing';

import { HygraphService } from './hygraph.service';

describe('HygraphService', () => {
  let service: HygraphService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HygraphService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
