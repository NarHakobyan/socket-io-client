import { inject, TestBed } from '@angular/core/testing';

import { EmitHistoryService } from './emit-history.service';

describe('EmitHistoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmitHistoryService]
    });
  });

  it('should be created', inject([EmitHistoryService], (service: EmitHistoryService) => {
    expect(service).toBeTruthy();
  }));
});
