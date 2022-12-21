import { TestBed } from '@angular/core/testing';

import { FBsrvService } from './fbsrv.service';

describe('FBsrvService', () => {
  let service: FBsrvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FBsrvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
