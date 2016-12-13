/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MeasurmentChartDataService } from './measurment-chart-data.service';

describe('MeasurmentChartDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MeasurmentChartDataService]
    });
  });

  it('should ...', inject([MeasurmentChartDataService], (service: MeasurmentChartDataService) => {
    expect(service).toBeTruthy();
  }));
});
