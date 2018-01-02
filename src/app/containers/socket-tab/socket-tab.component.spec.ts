import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocketTabComponent } from './socket-tab.component';

describe('SocketTabComponent', () => {
  let component: SocketTabComponent;
  let fixture: ComponentFixture<SocketTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SocketTabComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocketTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
