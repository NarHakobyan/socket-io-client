import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventPayloaddialogComponent } from './event-payload.component';

describe('EventPayloaddialogComponent', () => {
  let component: EventPayloaddialogComponent;
  let fixture: ComponentFixture<EventPayloaddialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EventPayloaddialogComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventPayloaddialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
