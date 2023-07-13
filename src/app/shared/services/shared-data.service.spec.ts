import {TestBed} from '@angular/core/testing';

import {SharedDataService} from './shared-data.service';

describe('SharedDataService', () => {
  let service: SharedDataService<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedDataService<any>);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
