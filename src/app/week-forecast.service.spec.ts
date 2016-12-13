/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WeekForecastService } from './week-forecast.service';

describe('WeekForecastService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WeekForecastService]
    });
  });

  it('should ...', inject([WeekForecastService], (service: WeekForecastService) => {
    expect(service).toBeTruthy();
  }));
});
