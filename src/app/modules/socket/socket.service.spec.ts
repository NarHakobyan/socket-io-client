import { inject, TestBed } from '@angular/core/testing';

import { SocketIoService } from './socket.service';

describe('SocketIoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SocketIoService]
    });
  });

  it('should be created', inject([SocketIoService], (service: SocketIoService) => {
    expect(service).toBeTruthy();
  }));
});
