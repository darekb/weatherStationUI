/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WeathercastTodayComponent } from './weathercast-today.component';

describe('WeathercastTodayComponent', () => {
  let component: WeathercastTodayComponent;
  let fixture: ComponentFixture<WeathercastTodayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeathercastTodayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeathercastTodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
