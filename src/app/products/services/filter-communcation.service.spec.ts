import {TestBed} from '@angular/core/testing';

import {FilterCommunicationService} from './filter-communication.service';

describe('FilterCommunicationService', () => {
  let service: FilterCommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterCommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
