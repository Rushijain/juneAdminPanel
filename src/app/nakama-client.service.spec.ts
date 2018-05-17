import { TestBed, inject } from '@angular/core/testing';

import { NakamaClientService } from './nakama-client.service';

describe('NakamaClientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NakamaClientService]
    });
  });

  it('should be created', inject([NakamaClientService], (service: NakamaClientService) => {
    expect(service).toBeTruthy();
  }));
});
