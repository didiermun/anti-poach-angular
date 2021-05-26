import { TestBed } from '@angular/core/testing';

import { TokenLoopService } from './token-loop.service';

describe('TokenLoopService', () => {
  let service: TokenLoopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenLoopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
