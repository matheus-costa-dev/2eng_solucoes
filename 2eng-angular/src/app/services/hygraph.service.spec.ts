import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HygraphService } from './hygraph.service';

describe('HygraphService', () => {
  let service: HygraphService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(HygraphService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
