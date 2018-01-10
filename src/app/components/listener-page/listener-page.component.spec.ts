import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListenerPageComponent } from './listener-page.component';

describe('ListenerPageComponent', () => {
  let component: ListenerPageComponent;
  let fixture: ComponentFixture<ListenerPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListenerPageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListenerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
