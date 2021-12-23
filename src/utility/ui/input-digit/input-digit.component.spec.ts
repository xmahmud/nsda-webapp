import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputDigitComponent } from './input-digit.component';

describe('InputDigitComponent', () => {
  let component: InputDigitComponent;
  let fixture: ComponentFixture<InputDigitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputDigitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputDigitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
