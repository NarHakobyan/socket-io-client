import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListenerTabGroupComponent } from './listener-tab-group.component';

describe('ListenerTabGroupComponent', () => {
  let component: ListenerTabGroupComponent;
  let fixture: ComponentFixture<ListenerTabGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListenerTabGroupComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListenerTabGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
