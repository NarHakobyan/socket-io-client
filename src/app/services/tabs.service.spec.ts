import { TestBed, inject } from '@angular/core/testing';

import { EmitterTabsService } from './tabs.service';

describe('EmitterTabsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmitterTabsService]
    });
  });

  it('should be created', inject([EmitterTabsService], (service: EmitterTabsService) => {
    expect(service).toBeTruthy();
  }));
});
