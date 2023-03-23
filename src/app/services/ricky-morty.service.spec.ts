import { TestBed } from '@angular/core/testing';

import { RickyMortyService } from './ricky-morty.service';

describe('RickyMortyService', () => {
  let service: RickyMortyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RickyMortyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
