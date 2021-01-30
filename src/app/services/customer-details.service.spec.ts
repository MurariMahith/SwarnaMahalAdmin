import { TestBed, inject } from '@angular/core/testing';

import { CustomerDetailsService } from './customer-details.service';

describe('CustomerDetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomerDetailsService]
    });
  });

  it('should be created', inject([CustomerDetailsService], (service: CustomerDetailsService) => {
    expect(service).toBeTruthy();
  }));
});
