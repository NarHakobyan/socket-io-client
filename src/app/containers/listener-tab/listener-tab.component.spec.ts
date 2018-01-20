import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListenerTabComponent } from './listener-tab.component';

describe('ListenerTabComponent', () => {
  let component: ListenerTabComponent;
  let fixture: ComponentFixture<ListenerTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListenerTabComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListenerTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
