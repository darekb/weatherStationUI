/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TodayForecastService } from './today-forecast.service';

describe('TodayForecastService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodayForecastService]
    });
  });

  it('should ...', inject([TodayForecastService], (service: TodayForecastService) => {
    expect(service).toBeTruthy();
  }));
});
