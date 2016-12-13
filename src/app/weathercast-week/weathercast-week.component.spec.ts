/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WeathercastWeekComponent } from './weathercast-week.component';

describe('WeathercastWeekComponent', () => {
  let component: WeathercastWeekComponent;
  let fixture: ComponentFixture<WeathercastWeekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeathercastWeekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeathercastWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
