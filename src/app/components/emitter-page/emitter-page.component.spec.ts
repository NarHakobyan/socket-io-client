import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmitterPageComponent } from './emitter-page.component';

describe('EmitterPageComponent', () => {
  let component: EmitterPageComponent;
  let fixture: ComponentFixture<EmitterPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmitterPageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmitterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
