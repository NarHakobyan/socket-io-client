import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventPayloadDialogComponent } from './event-payload.component';

describe('EventPayloadDialogComponent', () => {
  let component: EventPayloadDialogComponent;
  let fixture: ComponentFixture<EventPayloadDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EventPayloadDialogComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventPayloadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
